import { notFound } from "next/navigation"
import { ClassTimeSelection } from "@/components/class-time-selection"
import { RegistrationFlow } from "@/components/registration-flow"
import { brightBusySaturdayAcademyGroup, defaultAvailability, getProgramBySlug, getProgramGroupBySlug } from "@/lib/programs"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { program?: string; group?: string }
}) {
  const { program: programSlug, group: groupSlug } = searchParams

  if (!programSlug && !groupSlug) {
    notFound()
  }

  if (groupSlug) {
    const group = getProgramGroupBySlug(groupSlug)

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

  const program = getProgramBySlug(programSlug as string)

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto space-y-8 px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Checkout</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">{program.checkoutHeadline}</h1>
          <p className="mt-4 text-lg text-gray-700">
            Add the class to cart, create your account, complete the liability waiver, and finish payment in one place.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Need a different time?{" "}
            <a href={`/register?group=${brightBusySaturdayAcademyGroup.slug}`} className="font-semibold text-red-600 underline-offset-4 hover:underline">
              Go back to the class time chooser
            </a>
            .
          </p>
        </div>
        <RegistrationFlow program={program} initialAvailability={defaultAvailability} />
      </div>
    </main>
  )
}
