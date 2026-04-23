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

export const KORAKICKZ_AGE_COPY = "KoraKickz soccer classes are designed for children ages 2 and up."

export const TEMPORARY_WAIVER_COPY =
  "This program includes physical activities such as soccer instruction, movement drills, and general athletic training. Participation involves active physical movement and carries the possibility of bumps, falls, and other risks that can occur during youth sports."

export const PHOTO_CONSENT_COPY =
  "I give KoraKickz permission to use photos or short videos of my child taken during class for marketing, website, and social media purposes."

export const CURRENT_SPRING_SESSION_LABEL = "Current class in progress"

export const brightBusySaturdayAcademy: ProgramDefinition = {
  slug: "bright-busy-saturday-academy-10am",
  sport: "soccer",
  title: "Bright & Busy Saturday Academy - 10:00 AM Class",
  subtitle: "Current spring soccer class in Astoria",
  heroTitle: "Find Your Child's Summer Soccer Class",
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
    "Bright & Busy Saturday Academy blends soccer fundamentals, confidence-building movement, and fun, structured instruction in a warm beginner-friendly environment.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const brightBusySaturdayAcademyLate: ProgramDefinition = {
  slug: "bright-busy-saturday-academy-11am",
  sport: "soccer",
  title: "Bright & Busy Saturday Academy - 11:00 AM Class",
  subtitle: "Current spring soccer class in Astoria",
  heroTitle: "Find Your Child's Summer Soccer Class",
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
    "This second spring session gives families another Saturday option at Bright and Busy Daycare while keeping the same format and location.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const summerParentAndMe: ProgramDefinition = {
  slug: "summer-soccer-parent-and-me-10am",
  sport: "soccer",
  title: "Parent & Me",
  subtitle: "Summer soccer for 2s in Astoria",
  heroTitle: "Find Your Child's Summer Soccer Class",
  locationName: "Bright and Busy Daycare",
  locationAddress: "33-02 30th Ave, Astoria, New York",
  dateRangeLabel: "May 16 – August 1, 2026",
  sessionsLabel: "12 Saturdays",
  noClassLabel: "45-minute class",
  timeLabel: "10:00 AM – 10:45 AM",
  capacity: 16,
  programFee: 260,
  organizationFee: 0,
  totalFee: 260,
  registerLabel: "Register",
  checkoutHeadline: "Reserve your child's spot in Parent & Me",
  description:
    "Parent & Me introduces two-year-olds to soccer movement, confidence, and fun with a caregiver active in the class from start to finish.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const summerJuniorStrikers: ProgramDefinition = {
  slug: "summer-soccer-junior-strikers-11am",
  sport: "soccer",
  title: "Junior Strikers",
  subtitle: "Summer soccer for ages 3-5 in Astoria",
  heroTitle: "Find Your Child's Summer Soccer Class",
  locationName: "Bright and Busy Daycare",
  locationAddress: "33-02 30th Ave, Astoria, New York",
  dateRangeLabel: "May 16 – August 1, 2026",
  sessionsLabel: "12 Saturdays",
  noClassLabel: "45-minute class",
  timeLabel: "11:00 AM – 11:45 AM",
  capacity: 16,
  programFee: 285,
  organizationFee: 0,
  totalFee: 285,
  registerLabel: "Register",
  checkoutHeadline: "Reserve your child's spot in Junior Strikers",
  description:
    "Junior Strikers helps ages 3-5 build strong ball skills, coordination, and confidence through energetic small-group coaching.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const summerFutureStars: ProgramDefinition = {
  slug: "summer-soccer-future-stars-12pm",
  sport: "soccer",
  title: "Future Stars",
  subtitle: "Summer soccer for ages 6+ in Astoria",
  heroTitle: "Find Your Child's Summer Soccer Class",
  locationName: "Bright and Busy Daycare",
  locationAddress: "33-02 30th Ave, Astoria, New York",
  dateRangeLabel: "May 16 – August 1, 2026",
  sessionsLabel: "12 Saturdays",
  noClassLabel: "45-minute class",
  timeLabel: "12:00 PM – 12:45 PM",
  capacity: 16,
  programFee: 285,
  organizationFee: 0,
  totalFee: 285,
  registerLabel: "Register",
  checkoutHeadline: "Reserve your child's spot in Future Stars",
  description:
    "Future Stars gives older players a faster-paced class focused on sharper technique, game confidence, and stronger decision-making.",
  bringItems: ["Athletic shirt and shorts", "Water bottle", "Indoor training shoes or sneakers"],
  waiverLabel:
    "I agree to the KoraKickz liability waiver and allow my child to participate in program activities.",
}

export const summerSoccerPrograms = [summerParentAndMe, summerJuniorStrikers, summerFutureStars]

export const summerSaturdaySoccerGroup: ProgramGroup = {
  slug: "summer-saturday-soccer-2026",
  title: "Summer Saturday Soccer 2026",
  description:
    "Choose the class that fits your child's age group. Each class is registered and paid for separately.",
  programs: summerSoccerPrograms,
}

export const programs = [...summerSoccerPrograms, brightBusySaturdayAcademy, brightBusySaturdayAcademyLate]

export const programGroups = [summerSaturdaySoccerGroup]

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug)
}

export function getProgramGroupBySlug(slug: string) {
  return programGroups.find((group) => group.slug === slug)
}

export function getProgramGroupForProgramSlug(slug: string) {
  return programGroups.find((group) => group.programs.some((program) => program.slug === slug))
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

export const defaultAvailability = {
  capacity: summerParentAndMe.capacity,
  paidCount: 0,
  reservedCount: 0,
  remaining: summerParentAndMe.capacity,
  soldOut: false,
  message: getAvailabilityMessage(summerParentAndMe.capacity),
} satisfies ProgramAvailability
