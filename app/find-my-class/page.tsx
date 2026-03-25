import Link from "next/link"
import { Button } from "@/components/ui/button"

const sportChoices = [
  {
    name: "Soccer",
    description: "Currently open for registration with two Saturday class times available.",
    href: "/soccer/find-my-class",
    available: true,
  },
  {
    name: "Basketball",
    description: "Basketball classes are planned next and will open here when registration is ready.",
    href: "/basketball",
    available: false,
  },
  {
    name: "MMA/Boxing/Wrestling",
    description: "Combat-sports programming is planned and will appear here once classes are available.",
    href: "/mma",
    available: false,
  },
]

export default function FindMyClassChooserPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto space-y-10 px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Find My Class</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">Choose Your Sport</h1>
          <p className="mt-4 text-lg text-gray-700">
            Soccer is currently available for registration. Basketball and MMA/Boxing/Wrestling are listed here so families can see what is coming next.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {sportChoices.map((sport) => (
            <div
              key={sport.name}
              className={`relative overflow-hidden rounded-2xl border p-8 shadow-sm ${
                sport.available ? "border-red-100 bg-white" : "border-gray-200 bg-gray-100 opacity-70"
              }`}
            >
              {!sport.available ? (
                <div className="absolute left-[-50px] top-6 rotate-[-18deg] bg-red-600 px-16 py-2 text-sm font-semibold uppercase tracking-wide text-white">
                  Coming Soon
                </div>
              ) : null}
              <h2 className="text-2xl font-bold text-black">{sport.name}</h2>
              <p className="mt-4 text-sm text-gray-700">{sport.description}</p>
              <div className="mt-6">
                {sport.available ? (
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href={sport.href}>View Available Classes</Link>
                  </Button>
                ) : (
                  <Button type="button" variant="outline" disabled>
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
