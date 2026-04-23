import {
  DEFAULT_BRING_ITEMS,
  DEFAULT_WAIVER_LABEL,
  defaultAvailability,
  getAvailabilityMessage,
  getProgramGroupBySlug,
  type ProgramAvailability,
  type ProgramDefinition,
  type ProgramGroup,
} from "@/lib/programs"
import { hasSupabaseEnv } from "@/lib/env"
import { getSupabaseServiceClient } from "@/lib/supabase"

type ProgramRecord = {
  id: string
  slug: string
  title: string
  sport: string
  capacity: number
  program_fee: number
  organization_fee: number
  total_fee: number
  date_range_label: string
  sessions_label: string
  no_class_label: string
  time_label: string
  location_name: string
  location_address: string
}

type RegistrationRecord = {
  status: string
  reservation_expires_at: string | null
}

function buildProgramFromRecord(record: ProgramRecord): ProgramDefinition {
  return {
    slug: record.slug,
    sport: "soccer",
    title: record.title,
    subtitle: `${record.title} soccer class in Astoria`,
    heroTitle: "Find Your Child's Soccer Class",
    locationName: record.location_name,
    locationAddress: record.location_address,
    dateRangeLabel: record.date_range_label,
    sessionsLabel: record.sessions_label,
    noClassLabel: record.no_class_label,
    timeLabel: record.time_label,
    capacity: record.capacity,
    programFee: record.program_fee,
    organizationFee: record.organization_fee,
    totalFee: record.total_fee,
    registerLabel: "Register",
    checkoutHeadline: `Reserve your child's spot in ${record.title}`,
    description: `${record.title} gives families a clear soccer class option with structured instruction, age-appropriate coaching, and a smooth online registration flow.`,
    bringItems: DEFAULT_BRING_ITEMS,
    waiverLabel: DEFAULT_WAIVER_LABEL,
  }
}

async function getProgramRecordBySlug(slug: string): Promise<ProgramRecord | null> {
  if (!hasSupabaseEnv()) {
    return null
  }

  const supabase = getSupabaseServiceClient()
  const { data, error } = await supabase.from("programs").select("*").eq("slug", slug).maybeSingle()

  if (error) {
    throw error
  }

  return data as ProgramRecord | null
}

export async function getHydratedProgramBySlug(programSlug: string) {
  const record = await getProgramRecordBySlug(programSlug)

  if (!record) {
    return null
  }

  return buildProgramFromRecord(record)
}

export async function getHydratedProgramGroupBySlug(groupSlug: string): Promise<ProgramGroup | null> {
  const group = getProgramGroupBySlug(groupSlug)

  if (!group) {
    return null
  }

  const programs = await Promise.all(group.programSlugs.map((slug) => getHydratedProgramBySlug(slug)))

  return {
    ...group,
    programs: programs.filter((program): program is ProgramDefinition => program !== null),
  }
}

export async function getProgramAvailability(programSlug: string): Promise<ProgramAvailability> {
  const program = await getHydratedProgramBySlug(programSlug)

  if (!program) {
    throw new Error("Program not found.")
  }

  if (!hasSupabaseEnv()) {
    return defaultAvailability
  }

  try {
    const supabase = getSupabaseServiceClient()
    const programRecord = await getProgramRecordBySlug(program.slug)

    if (!programRecord) {
      throw new Error("Program record not found.")
    }

    const { data, error } = await supabase
      .from("registrations")
      .select("status,reservation_expires_at")
      .eq("program_id", programRecord.id)
      .returns<RegistrationRecord[]>()

    if (error) {
      throw error
    }

    const now = new Date()
    const paidCount = data.filter((registration) => registration.status === "paid").length
    const activeReservations = data.filter((registration) => {
      if (registration.status === "paid") {
        return true
      }

      if (registration.status !== "pending_payment" || !registration.reservation_expires_at) {
        return false
      }

      return new Date(registration.reservation_expires_at) > now
    }).length

    const remaining = Math.max(programRecord.capacity - activeReservations, 0)

    return {
      capacity: programRecord.capacity,
      paidCount,
      reservedCount: activeReservations,
      remaining,
      soldOut: remaining === 0,
      message: getAvailabilityMessage(remaining),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        ...defaultAvailability,
        message: defaultAvailability.message,
      }
    }

    throw error
  }
}

export async function createOrUpdateProgramWaitlistEntry(input: {
  programSlug: string
  parentName: string
  email: string
  requestedTimes: string[]
}) {
  const programRecord = await getProgramRecordBySlug(input.programSlug)

  if (!programRecord) {
    throw new Error("Program not found.")
  }

  const supabase = getSupabaseServiceClient()
  const payload = {
    program_id: programRecord.id,
    program_slug: programRecord.slug,
    parent_name: input.parentName,
    email: input.email.toLowerCase(),
    requested_time_labels: input.requestedTimes,
  }

  const { error } = await supabase.from("waitlist_entries").upsert(payload, {
    onConflict: "program_slug,email",
  })

  if (error) {
    throw error
  }
}
