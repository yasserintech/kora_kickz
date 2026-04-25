import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  KORAKICKZ_AGE_COPY,
} from "@/lib/programs"

export default function SoccerPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex h-[50vh] items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/soccer-program.png?height=600&width=1600"
            alt="Kids playing soccer"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold text-white md:text-6xl">Soccer Program</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white">
            Developing skills, teamwork, and a love for the beautiful game
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/soccer/registration">View Registration</Link>
          </Button>
          <p className="mt-4 text-sm text-white">
            <Link href="/policy" className="font-semibold text-red-300 underline-offset-4 hover:underline">
              Review Parent Policy
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 rounded-lg bg-gray-100 p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold text-black">What Makes KoraKickz Different</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-white p-5">
                <h3 className="text-lg font-bold text-red-600">Safe Indoor Environment (All Seasons)</h3>
                <p className="mt-2 text-gray-700">
                  All sessions are held indoors in a comfortable, climate-controlled space to help prevent overheating,
                  rashes, and weather-related disruptions so kids can play and learn safely year-round.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5">
                <h3 className="text-lg font-bold text-red-600">Experienced, Kid-Focused Coaching</h3>
                <p className="mt-2 text-gray-700">
                  Our coaches know how to work with young children, creating structured sessions that build confidence,
                  coordination, and teamwork in a fun and supportive way.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5">
                <h3 className="text-lg font-bold text-red-600">Purposeful &amp; Structured Programs</h3>
                <p className="mt-2 text-gray-700">
                  Every class is designed with intention, balancing skill development and play to keep kids engaged
                  while helping them grow.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5">
                <h3 className="text-lg font-bold text-red-600">Competitive, Budget-Friendly Pricing</h3>
                <p className="mt-2 text-gray-700">
                  We make it a priority to keep our programs affordable. Compared to other programs in the area, we aim
                  to provide strong value for both families and schools.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Program Overview</h2>
              <p className="mb-4 text-gray-700">
                {KORAKICKZ_AGE_COPY} Our soccer program is designed to introduce children to the fundamentals of soccer
                in a fun, supportive environment. Through age-appropriate drills, games, and activities, children build
                coordination, confidence, teamwork, and a real love for the sport.
              </p>
              <p className="mb-4 text-gray-700">
                Each session focuses on skill development while emphasizing positive values like sportsmanship, respect,
                and perseverance. Our experienced coaches create a nurturing atmosphere where every child can thrive
                regardless of their starting skill level.
              </p>
              <p className="text-gray-700">
                Whether your child is brand new to soccer or ready for a more independent class, our Saturday lineup in
                Astoria gives families a clear path into the right age group.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image src="/koraaaa.webp" alt="Soccer training" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Age Groups</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-center text-xl font-bold text-red-600">Parent &amp; Me (Age 2)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Introduction to basic movements</li>
                <li>• Fun games that develop coordination</li>
                <li>• Focus on enjoyment and positive experiences</li>
                <li>• 45-minute sessions</li>
                <li>• Parent participation required</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-center text-xl font-bold text-red-600">Junior Strikers (Ages 3-5)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic soccer skills and rules</li>
                <li>• Small-sided games</li>
                <li>• Introduction to teamwork concepts</li>
                <li>• 45-minute sessions</li>
                <li>• Focus on skill development through play</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What We Teach</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Technical Skills</h3>
              <p className="text-gray-700">
                Dribbling, passing, shooting, and ball control fundamentals appropriate for each age group.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Game Understanding</h3>
              <p className="text-gray-700">
                Basic rules, positions, and tactical concepts introduced in an age-appropriate way.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Physical Development</h3>
              <p className="text-gray-700">
                Coordination, balance, agility, and motor skills through fun soccer activities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Social Skills</h3>
              <p className="text-gray-700">
                Teamwork, communication, sportsmanship, and respect for teammates and opponents.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Join Our Summer Soccer Program?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Review the class options, choose the right group, complete the waiver and picture consent, and pay online.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/soccer/registration">View Registration</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="tel:2012333333">Call Us: (201) 233-3333</a>
            </Button>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/policy" className="font-semibold text-red-300 underline-offset-4 hover:underline">
              Parent Policy
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
