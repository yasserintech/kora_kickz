export type ProgramDefinition = {
  slug: string
  sport: "soccer"
  title: string
  subtitle: string
  heroTitle: string
  locationName: string
  locationAddress: string
  dateRangeLabel: string
  sessionsLabel: string
  noClassLabel: string
  timeLabel: string
  capacity: number
  programFee: number
  organizationFee: number
  totalFee: number
  registerLabel: string
  checkoutHeadline: string
  description: string
  bringItems: string[]
  waiverLabel: string
}

export type ProgramGroup = {
  slug: string
  title: string
  description: string
  programSlugs: string[]
  programs: ProgramDefinition[]
}

export type ProgramAvailability = {
  capacity: number
  paidCount: number
  reservedCount: number
  remaining: number
  soldOut: boolean
  message: string
}

export const KORAKICKZ_AGE_COPY = "KoraKickz soccer classes are designed for children ages 2 and up."

export const TEMPORARY_WAIVER_COPY =
  "This program includes physical activities such as soccer instruction, movement drills, and general athletic training. Participation involves active physical movement and carries the possibility of bumps, falls, and other risks that can occur during youth sports."

export const PHOTO_CONSENT_COPY =
  "I give KoraKickz permission to use photos or short videos of my child taken during class for marketing, website, and social media purposes."

export const CURRENT_SPRING_SESSION_LABEL = "Current class in progress"

export const DEFAULT_BRING_ITEMS = ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"]

export const DEFAULT_WAIVER_LABEL =
  "I agree to the KoraKickz liability waiver and allow my child to participate in program activities."

export const SPRING_PROGRAM_SLUGS = ["bright-busy-saturday-academy-10am", "bright-busy-saturday-academy-11am"] as const
export const SUMMER_PROGRAM_SLUGS = [
  "summer-soccer-parent-and-me-10am",
  "summer-soccer-junior-strikers-11am",
] as const

const GROUPS = [
  {
    slug: "summer-saturday-soccer-2026",
    title: "Summer Saturday Soccer 2026",
    description: "Choose the class that fits your child's age group. Each class is registered and paid for separately.",
    programSlugs: [...SUMMER_PROGRAM_SLUGS],
  },
] as const

export function getProgramGroupBySlug(slug: string): ProgramGroup | null {
  const group = GROUPS.find((entry) => entry.slug === slug)

  if (!group) {
    return null
  }

  return {
    ...group,
    programSlugs: [...group.programSlugs],
    programs: [],
  }
}

export function getProgramGroupForProgramSlug(slug: string): ProgramGroup | null {
  const group = GROUPS.find((entry) => (entry.programSlugs as readonly string[]).includes(slug))

  if (!group) {
    return null
  }

  return {
    ...group,
    programSlugs: [...group.programSlugs],
    programs: [],
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getAvailabilityMessage(remaining: number) {
  if (remaining <= 0) {
    return "Waitlist Open"
  }

  if (remaining <= 2) {
    return "Almost Full"
  }

  return "Open For Registration"
}

export const UNAVAILABLE_AVAILABILITY_MESSAGE = "Registration Temporarily Unavailable"

export const defaultAvailability: ProgramAvailability = {
  capacity: 16,
  paidCount: 0,
  reservedCount: 0,
  remaining: 16,
  soldOut: false,
  message: getAvailabilityMessage(16),
}

export const unavailableAvailability: ProgramAvailability = {
  capacity: 0,
  paidCount: 0,
  reservedCount: 0,
  remaining: 0,
  soldOut: true,
  message: UNAVAILABLE_AVAILABILITY_MESSAGE,
}
