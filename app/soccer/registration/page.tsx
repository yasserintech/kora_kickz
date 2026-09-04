import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getHydratedProgramBySlug, getProgramAvailability } from "@/lib/program-service"
import { formatCurrency, unavailableAvailability, UNAVAILABLE_AVAILABILITY_MESSAGE } from "@/lib/programs"

export const dynamic = "force-dynamic"

export default async function SoccerRegistrationPage() {
  const [koraKickers, partnerSchool, koraAvailability] = await Promise.all([
    getHydratedProgramBySlug("sunday-soccer-kora-kickers-9am"),
    getHydratedProgramBySlug("sunday-soccer-partner-school"),
    getProgramAvailability("sunday-soccer-kora-kickers-9am").catch(() => unavailableAvailability),
  ])

  if (!koraKickers || !partnerSchool) {
    throw new Error("Unable to load registration classes.")
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Soccer Registration</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">Sunday Soccer Registration</h1>
          <p className="mt-4 text-lg text-gray-700">
            Choose the Sunday program that fits your family. All classes are indoors at Bright and Busy Daycare.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Ages 2–4</p>
            <h2 className="mt-4 text-2xl font-bold text-black">{koraKickers.title}</h2>
            <p className="mt-3 font-semibold text-black">{koraKickers.timeLabel}</p>
            <p className="mt-1 text-gray-700">{koraKickers.dateRangeLabel}</p>
            <p className="mt-2 text-sm text-gray-600">Free class September 27</p>
            <p className="mt-5 text-3xl font-extrabold text-black">{formatCurrency(koraKickers.totalFee)}</p>
            <p className="mt-2 text-sm text-gray-600">8-week Sunday session</p>
            <Button asChild className="mt-6 w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${koraKickers.slug}`}>
                {koraAvailability.message === UNAVAILABLE_AVAILABILITY_MESSAGE ? "Check Availability" : koraAvailability.soldOut ? "Join Waiting List" : "Register"}
              </Link>
            </Button>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Partner School Families</p>
            <h2 className="mt-4 text-2xl font-bold text-black">{partnerSchool.title}</h2>
            <p className="mt-3 text-gray-700">{partnerSchool.dateRangeLabel}</p>
            <p className="mt-2 text-sm text-gray-600">Free classes September 20 &amp; 27</p>
            <p className="mt-5 text-3xl font-extrabold text-black">{formatCurrency(partnerSchool.totalFee)}</p>
            <Button asChild className="mt-6 w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${partnerSchool.slug}`}>Register</Link>
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
