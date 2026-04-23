import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getHydratedProgramBySlug } from "@/lib/program-service"
import {
  CURRENT_SPRING_SESSION_LABEL,
  formatCurrency,
} from "@/lib/programs"

export const dynamic = "force-dynamic"

export default async function SoccerRegistrationPage() {
  const [springTen, springEleven, parentAndMe, juniorStrikers, futureStars] = await Promise.all([
    getHydratedProgramBySlug("bright-busy-saturday-academy-10am"),
    getHydratedProgramBySlug("bright-busy-saturday-academy-11am"),
    getHydratedProgramBySlug("summer-soccer-parent-and-me-10am"),
    getHydratedProgramBySlug("summer-soccer-junior-strikers-11am"),
    getHydratedProgramBySlug("summer-soccer-future-stars-12pm"),
  ])

  if (!springTen || !springEleven || !parentAndMe || !juniorStrikers || !futureStars) {
    throw new Error("Unable to load registration classes.")
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Soccer Registration</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">Registration</h1>
          <p className="mt-4 text-lg text-gray-700">
            Our current spring class is already in progress, and summer registration is now open for three separate
            paid Saturday class options.
          </p>
        </div>

        <div className="mb-8 rounded-lg bg-gray-100 p-8 shadow-md">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">{CURRENT_SPRING_SESSION_LABEL}</p>
          <h2 className="mt-4 text-2xl font-bold text-black">Bright &amp; Busy Saturday Academy</h2>
          <p className="mt-3 text-gray-700">Started March 14, 2026 and ends May 9, 2026.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Current Class Times</p>
              <p className="mt-2 font-semibold text-black">{springTen.timeLabel}</p>
              <p className="text-sm text-gray-600">{springEleven.timeLabel}</p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Location</p>
              <p className="mt-2 font-semibold text-black">{springTen.locationName}</p>
              <p className="text-sm text-gray-600">{springTen.locationAddress}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Age Range</p>
            <p className="mt-2 text-lg font-semibold text-black">Age 2</p>
            <h2 className="mt-5 text-2xl font-bold text-black">{parentAndMe.title}</h2>
            <p className="mt-3 text-gray-700">{parentAndMe.timeLabel}</p>
            <p className="mt-1 text-gray-700">{parentAndMe.dateRangeLabel}</p>
            <p className="mt-5 text-3xl font-extrabold text-black">{formatCurrency(parentAndMe.totalFee)}</p>
            <p className="mt-2 text-sm text-gray-600">12-week summer session</p>
            <Button asChild className="mt-6 w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${parentAndMe.slug}`}>Register For This Class</Link>
            </Button>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Age Range</p>
            <p className="mt-2 text-lg font-semibold text-black">Ages 3-5</p>
            <h2 className="mt-5 text-2xl font-bold text-black">{juniorStrikers.title}</h2>
            <p className="mt-3 text-gray-700">{juniorStrikers.timeLabel}</p>
            <p className="mt-1 text-gray-700">{juniorStrikers.dateRangeLabel}</p>
            <p className="mt-5 text-3xl font-extrabold text-black">{formatCurrency(juniorStrikers.totalFee)}</p>
            <p className="mt-2 text-sm text-gray-600">12-week summer session</p>
            <Button asChild className="mt-6 w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${juniorStrikers.slug}`}>Register For This Class</Link>
            </Button>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Age Range</p>
            <p className="mt-2 text-lg font-semibold text-black">Ages 6+</p>
            <h2 className="mt-5 text-2xl font-bold text-black">{futureStars.title}</h2>
            <p className="mt-3 text-gray-700">{futureStars.timeLabel}</p>
            <p className="mt-1 text-gray-700">{futureStars.dateRangeLabel}</p>
            <p className="mt-5 text-3xl font-extrabold text-black">{formatCurrency(futureStars.totalFee)}</p>
            <p className="mt-2 text-sm text-gray-600">12-week summer session</p>
            <Button asChild className="mt-6 w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${futureStars.slug}`}>Register For This Class</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            Want the full overview first? Visit the{" "}
            <Link href="/soccer" className="font-semibold text-red-600 underline-offset-4 hover:underline">
              Soccer page
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
