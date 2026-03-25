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

export const KORAKICKZ_AGE_COPY = "KoraKickz programs are designed for children ages 2–13."

export const TEMPORARY_WAIVER_COPY =
  "This program includes physical activities such as soccer instruction, movement drills, and general athletic training. Participation involves active physical movement and carries the possibility of bumps, falls, and other risks that can occur during youth sports."

export const brightBusySaturdayAcademy: ProgramDefinition = {
  slug: "bright-busy-saturday-academy-10am",
  sport: "soccer",
  title: "Bright & Busy Saturday Academy",
  subtitle: "Saturday soccer training for ages 2–13 in Astoria",
  heroTitle: "Find Your Child's Saturday Soccer Class",
  locationName: "Bright and Busy Daycare",
  locationAddress: "33-02 30th Ave, Astoria, New York",
  dateRangeLabel: "March 14 – May 9, 2026",
  sessionsLabel: "8 Saturdays",
  noClassLabel: "No class on March 21, 2026",
  timeLabel: "10:00 AM – 10:45 AM",
  capacity: 16,
  programFee: 175,
  organizationFee: 15,
  totalFee: 190,
  registerLabel: "Register",
  checkoutHeadline: "Reserve your child's spot in Bright & Busy Saturday Academy",
  description:
    "Bright & Busy Saturday Academy blends soccer fundamentals, confidence-building movement, and fun, structured instruction in a warm beginner-friendly environment. Families can review the schedule, add the class to their cart, create an account, and complete registration in one professional flow.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const brightBusySaturdayAcademyLate: ProgramDefinition = {
  slug: "bright-busy-saturday-academy-11am",
  sport: "soccer",
  title: "Bright & Busy Saturday Academy - 11:00 AM Class",
  subtitle: "Saturday soccer training for ages 2–13 in Astoria",
  heroTitle: "Find Your Child's Saturday Soccer Class",
  locationName: "Bright and Busy Daycare",
  locationAddress: "33-02 30th Ave, Astoria, New York",
  dateRangeLabel: "March 14 – May 9, 2026",
  sessionsLabel: "8 Saturdays",
  noClassLabel: "No class on March 21, 2026",
  timeLabel: "11:00 AM – 11:45 AM",
  capacity: 16,
  programFee: 175,
  organizationFee: 15,
  totalFee: 190,
  registerLabel: "Register",
  checkoutHeadline: "Reserve your child's spot in the 11:00 AM Bright & Busy Saturday Academy class",
  description:
    "This second Saturday soccer session gives families another time option at Bright and Busy Daycare while keeping the same format, dates, fee structure, and age range.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const soccerPrograms = [brightBusySaturdayAcademy, brightBusySaturdayAcademyLate]

export const brightBusySaturdayAcademyGroup: ProgramGroup = {
  slug: "bright-busy-saturday-academy",
  title: "Bright & Busy Saturday Academy",
  description:
    "Register once, then choose from the available Saturday soccer class times at Bright and Busy Daycare.",
  programs: soccerPrograms,
}

export const programs = [...soccerPrograms]

export const programGroups = [brightBusySaturdayAcademyGroup]

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug)
}

export function getProgramGroupBySlug(slug: string) {
  return programGroups.find((group) => group.slug === slug)
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getAvailabilityMessage(remaining: number, capacity: number) {
  if (remaining <= 0) {
    return "Sold Out"
  }

  if (remaining === 1) {
    return "Only 1 spot left!"
  }

  if (remaining === 2) {
    return "Only 2 spots left!"
  }

  return `Spots Remaining: ${remaining} of ${capacity}`
}

export const defaultAvailability = {
  capacity: brightBusySaturdayAcademy.capacity,
  paidCount: 0,
  reservedCount: 0,
  remaining: brightBusySaturdayAcademy.capacity,
  soldOut: false,
  message: getAvailabilityMessage(brightBusySaturdayAcademy.capacity, brightBusySaturdayAcademy.capacity),
} satisfies ProgramAvailability
