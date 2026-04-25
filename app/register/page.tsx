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
        <RegistrationFlow program={program} initialAvailability={defaultAvailability} />
      </div>
    </main>
  )
}
