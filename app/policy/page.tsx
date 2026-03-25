import { parentPolicySections } from "@/lib/policy"

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto max-w-4xl space-y-8 px-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Parent Policy</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">Parent Policy</h1>
          <p className="mt-4 text-lg text-gray-700">
            To help us create a safe, structured, and fun environment for every child, we ask all parents and guardians to follow the policies below.
          </p>
        </div>

        <div className="space-y-6">
          {parentPolicySections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black">{section.title}</h2>
              <div className="mt-4 space-y-3 text-gray-700">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
