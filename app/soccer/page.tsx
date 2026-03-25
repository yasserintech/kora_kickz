import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GroupRegistrationPanel } from "@/components/group-registration-panel"
import {
  brightBusySaturdayAcademy,
  brightBusySaturdayAcademyLate,
  brightBusySaturdayAcademyGroup,
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
            <Link href="/soccer/find-my-class">Find My Soccer Classes</Link>
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
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Program Overview</h2>
              <p className="mb-4 text-gray-700">
                {KORAKICKZ_AGE_COPY} Our soccer programming introduces core fundamentals in a fun, supportive environment where children can build coordination, confidence, and teamwork.
              </p>
              <p className="mb-4 text-gray-700">
                Each session focuses on skill development while emphasizing positive values like sportsmanship, respect,
                and perseverance. Our experienced coaches create a nurturing atmosphere where every child can thrive
                regardless of their starting skill level.
              </p>
              <p className="text-gray-700">
                Whether your child is just starting out or already has some experience, our program provides the perfect
                foundation for their soccer journey.
              </p>
            </div>
            <div className="relative h-[450px] overflow-hidden rounded-lg">
              <Image src="/koraaaa.webp" alt="Kids playing sports" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold">Find My Class</h2>
            <p className="text-gray-700">
              Families can move from Soccer directly into the available Bright &amp; Busy Saturday Academy class options below. Both sessions use the same program structure, fees, dates, and location.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="text-2xl font-bold text-black">Available Soccer Classes</h3>
              <p className="mt-3 text-gray-700">
                Click register once, then choose the class time that works best for your family in the next step.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Dates</p>
                  <p className="mt-2 font-semibold text-black">{brightBusySaturdayAcademy.dateRangeLabel}</p>
                  <p className="text-sm text-gray-600">{brightBusySaturdayAcademy.noClassLabel}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Class Times</p>
                  <p className="mt-2 font-semibold text-black">{brightBusySaturdayAcademy.timeLabel}</p>
                  <p className="text-sm text-gray-600">{brightBusySaturdayAcademyLate.timeLabel}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Location</p>
                  <p className="mt-2 font-semibold text-black">{brightBusySaturdayAcademy.locationName}</p>
                  <p className="text-sm text-gray-600">{brightBusySaturdayAcademy.locationAddress}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/register?group=bright-busy-saturday-academy">Register</Link>
                </Button>
              </div>
            </div>

            <GroupRegistrationPanel group={brightBusySaturdayAcademyGroup} />
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
                Dribbling, passing, shooting, and ball control fundamentals delivered in an age-appropriate format.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Game Understanding</h3>
              <p className="text-gray-700">
                Basic rules, positions, and team concepts introduced in a way that feels fun and accessible.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Physical Development</h3>
              <p className="text-gray-700">
                Coordination, balance, agility, and motor skills grow through energetic soccer activities.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-600">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Social Skills</h3>
              <p className="text-gray-700">
                Teamwork, communication, sportsmanship, and respect are built into every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Join Our Soccer Program?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Families can now review the class, compare both time slots, and complete registration online.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/register?group=bright-busy-saturday-academy">Register</Link>
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
