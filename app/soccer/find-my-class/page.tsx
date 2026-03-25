import Link from "next/link"
import { GroupRegistrationPanel } from "@/components/group-registration-panel"
import {
  brightBusySaturdayAcademy,
  brightBusySaturdayAcademyLate,
  brightBusySaturdayAcademyGroup,
  KORAKICKZ_AGE_COPY,
} from "@/lib/programs"

export default function FindMyClassPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Soccer → Find My Class</p>
            <h1 className="text-4xl font-extrabold text-black md:text-5xl">{brightBusySaturdayAcademy.heroTitle}</h1>
            <p className="mt-6 text-lg text-gray-700">{KORAKICKZ_AGE_COPY}</p>
            <p className="mt-4 max-w-2xl text-base text-gray-600">
              Choose between our two Bright &amp; Busy Saturday Academy soccer class times below. Both sessions follow the same dates, fees, location, and policy requirements.
            </p>
            <p className="mt-4 text-sm text-gray-700">
              <Link href="/policy" className="font-semibold text-red-600 underline-offset-4 hover:underline">
                Review Parent Policy
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-black">Program Details</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Program Dates</p>
                  <p className="mt-2 text-lg font-semibold text-black">{brightBusySaturdayAcademy.dateRangeLabel}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Total Sessions</p>
                  <p className="mt-2 text-lg font-semibold text-black">{brightBusySaturdayAcademy.sessionsLabel}</p>
                  <p className="text-sm text-gray-600">{brightBusySaturdayAcademy.noClassLabel}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Class Times</p>
                  <p className="mt-2 text-lg font-semibold text-black">{brightBusySaturdayAcademy.timeLabel}</p>
                  <p className="text-lg font-semibold text-black">{brightBusySaturdayAcademyLate.timeLabel}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Location</p>
                  <p className="mt-2 text-lg font-semibold text-black">{brightBusySaturdayAcademy.locationName}</p>
                  <p className="text-sm text-gray-600">{brightBusySaturdayAcademy.locationAddress}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-black">What To Bring To Class</h2>
              <div className="mt-4 grid gap-3 text-gray-700 sm:grid-cols-3">
                {brightBusySaturdayAcademy.bringItems.map((item) => (
                  <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-black">Simple Registration Flow</h2>
              <div className="mt-5 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">Step 1: Parent selects the program</div>
                <div className="rounded-xl bg-gray-50 p-4">Step 2: Clicks Register and chooses a class time</div>
                <div className="rounded-xl bg-gray-50 p-4">Step 3: Adds it to cart</div>
                <div className="rounded-xl bg-gray-50 p-4">Step 4: Fills out child and parent information</div>
                <div className="rounded-xl bg-gray-50 p-4">Step 5: Agrees to the liability waiver</div>
                <div className="rounded-xl bg-gray-50 p-4">Step 6: Pays the $190 total fee and receives confirmation</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <GroupRegistrationPanel group={brightBusySaturdayAcademyGroup} />
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600">
                Looking for a broader overview first? Visit the{" "}
                <Link href="/soccer" className="font-semibold text-red-600 underline-offset-4 hover:underline">
                  Soccer page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
