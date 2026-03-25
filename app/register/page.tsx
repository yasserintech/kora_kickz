import { notFound } from "next/navigation"
import { RegistrationFlow } from "@/components/registration-flow"
import { defaultAvailability, getProgramBySlug } from "@/lib/programs"

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { program?: string }
}) {
  const { program: programSlug } = searchParams

  if (!programSlug) {
    notFound()
  }

  const program = getProgramBySlug(programSlug)

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
        </div>
        <RegistrationFlow program={program} initialAvailability={defaultAvailability} />
      </div>
    </main>
  )
}
