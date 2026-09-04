import { notFound } from "next/navigation"
import { ClassTimeSelection } from "@/components/class-time-selection"
import { RegistrationFlow } from "@/components/registration-flow"
import { defaultAvailability, getProgramGroupForProgramSlug } from "@/lib/programs"
import { getHydratedProgramBySlug, getHydratedProgramGroupBySlug } from "@/lib/program-service"

export const dynamic = "force-dynamic"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string; group?: string }>
}) {
  const { program: programSlug, group: groupSlug } = await searchParams

  if (!programSlug && !groupSlug) {
    notFound()
  }

  if (groupSlug) {
    const group = await getHydratedProgramGroupBySlug(groupSlug)

    if (!group) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-white py-16">
        <div className="container mx-auto space-y-8 px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Choose Your Class Time</p>
            <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">{group.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{group.description}</p>
          </div>
          <ClassTimeSelection group={group} />
        </div>
      </main>
    )
  }

  const program = await getHydratedProgramBySlug(programSlug as string)

  if (!program) {
    notFound()
  }

  const programGroup = getProgramGroupForProgramSlug(program.slug)
  const isKoraKickers = program.slug === "sunday-soccer-kora-kickers-9am"
  const isPartnerSchool = program.slug === "sunday-soccer-partner-school"

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto space-y-8 px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Checkout</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">{program.checkoutHeadline}</h1>
          <p className="mt-4 text-lg text-gray-700">
            Add the class to cart, create your account, complete the required consent forms, and finish payment in one place.
          </p>
          {programGroup ? (
            <p className="mt-3 text-sm text-gray-600">
              Need a different class?{" "}
              <a href={`/register?group=${programGroup.slug}`} className="font-semibold text-red-600 underline-offset-4 hover:underline">
                Go back to the class chooser
              </a>
              .
            </p>
          ) : null}
        </div>

        {isKoraKickers ? (
          <section className="max-w-3xl rounded-xl border border-red-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-black">Kora Kickers Program Details</h2>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><span className="font-semibold text-black">Ages:</span> 2–4</p>
              <p><span className="font-semibold text-black">Time:</span> 9:00 AM–9:35 AM</p>
              <p><span className="font-semibold text-black">Paid session:</span> October 4–November 22, 2026</p>
              <p><span className="font-semibold text-black">Free class:</span> September 27, 2026</p>
              <p><span className="font-semibold text-black">Location:</span> Bright and Busy Daycare, 33-02 30th Ave, Astoria, New York</p>
              <p><span className="font-semibold text-black">Indoor program:</span> Classes are held indoors, so there are no weather cancellations.</p>
              <p><span className="font-semibold text-black">Uniform:</span> KoraKickz athletic shirt and shorts are provided.</p>
            </div>
          </section>
        ) : null}

        {isPartnerSchool ? (
          <section className="max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Partner School Registration Only</p>
            <h2 className="mt-3 text-2xl font-bold text-black">Please confirm before registering</h2>
            <p className="mt-3 font-semibold text-gray-900">
              This registration is only for families whose child attends a KoraKickz partner school.
            </p>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><span className="font-semibold text-black">Paid session:</span> October 4–November 22, 2026</p>
              <p><span className="font-semibold text-black">Free classes:</span> September 20 and September 27, 2026</p>
              <p><span className="font-semibold text-black">Class time:</span> Coach Mo will assign your child to the appropriate 11:00 AM or 12:00 PM class based on age, skill level, and enrollment.</p>
              <p><span className="font-semibold text-black">Location:</span> Bright and Busy Daycare, 33-02 30th Ave, Astoria, New York</p>
              <p><span className="font-semibold text-black">Indoor program:</span> Classes are held indoors, so there are no weather cancellations.</p>
              <p><span className="font-semibold text-black">Uniform:</span> KoraKickz athletic shirt and shorts are provided.</p>
            </div>
          </section>
        ) : null}

        <RegistrationFlow program={program} initialAvailability={defaultAvailability} />
      </div>
    </main>
  )
}
