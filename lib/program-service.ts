import {
  defaultAvailability,
  getAvailabilityMessage,
  getProgramBySlug,
  summerParentAndMe,
  type ProgramAvailability,
  type ProgramDefinition,
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

function mapProgramToRow(program: ProgramDefinition) {
  return {
    slug: program.slug,
    title: program.title,
    sport: program.sport,
    capacity: program.capacity,
    program_fee: program.programFee,
    organization_fee: program.organizationFee,
    total_fee: program.totalFee,
    date_range_label: program.dateRangeLabel,
    sessions_label: program.sessionsLabel,
    no_class_label: program.noClassLabel,
    time_label: program.timeLabel,
    location_name: program.locationName,
    location_address: program.locationAddress,
  }
}

export async function ensureProgramRecord(program: ProgramDefinition) {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase environment variables are not configured.")
  }

  const supabase = getSupabaseServiceClient()
  const payload = mapProgramToRow(program)
  const { data, error } = await supabase
    .from("programs")
    .upsert(payload, { onConflict: "slug" })
    .select("*")
    .single()

  if (error) {
    throw error
  }

  return data as ProgramRecord
}

export async function getProgramAvailability(programSlug: string): Promise<ProgramAvailability> {
  const program = getProgramBySlug(programSlug)

  if (!program) {
    throw new Error("Program not found.")
  }

  if (!hasSupabaseEnv()) {
    return defaultAvailability
  }

  try {
    const supabase = getSupabaseServiceClient()
    const programRecord = await ensureProgramRecord(program)
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
  const program = getProgramBySlug(input.programSlug)

  if (!program) {
    throw new Error("Program not found.")
  }

  const supabase = getSupabaseServiceClient()
  const programRecord = await ensureProgramRecord(program)
  const payload = {
    program_id: programRecord.id,
    program_slug: program.slug,
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

export const fallbackProgram = summerParentAndMe
