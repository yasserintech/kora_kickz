import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KORAKICKZ_AGE_COPY } from "@/lib/programs"

export default function BasketballPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/basketball-program.jpeg?=600&width=1600"
            alt="Kids playing basketball"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Basketball Program</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Building skills, confidence, and teamwork on the court
          </p>
          <p className="text-sm text-white">
            <Link href="/policy" className="font-semibold text-red-300 underline-offset-4 hover:underline">
              Review Parent Policy
            </Link>
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/koraaaa.webp"
                alt="Kids playing sports"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <p className="text-gray-700 mb-4">
                {KORAKICKZ_AGE_COPY} Our basketball sessions focus on fundamentals, movement, and confidence in an engaging and supportive environment.
              </p>
              <p className="text-gray-700 mb-4">
                Each session focuses on skill development while emphasizing positive values like sportsmanship, respect,
                and perseverance. Our experienced coaches create a nurturing atmosphere where every child can thrive
                regardless of their starting skill level.
              </p>
              <p className="text-gray-700">
                Whether your child is just starting out or already has some experience, our program provides the perfect
                foundation for their basketball journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Focus */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Program Focus</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Movement Foundations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Introduction to basic movements</li>
                <li>• Fun games that develop coordination</li>
                <li>• Focus on enjoyment and positive experiences</li>
                <li>• 30-minute sessions</li>
                <li>• Parent participation encouraged</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Skill Building</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic basketball skills and rules</li>
                <li>• Modified games with lower hoops</li>
                <li>• Introduction to teamwork concepts</li>
                <li>• 45-minute sessions</li>
                <li>• Focus on skill development through play</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Confidence Through Play</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Advanced skill development</li>
                <li>• Basic offensive and defensive concepts</li>
                <li>• Competitive small-sided games</li>
                <li>• 60-minute sessions</li>
                <li>• Preparation for competitive play</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Teach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Teach</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fundamental Skills</h3>
              <p className="text-gray-700">
                Dribbling, passing, shooting, and defensive fundamentals appropriate for each age group.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Game Understanding</h3>
              <p className="text-gray-700">
                Basic rules, positions, and tactical concepts introduced in an age-appropriate way.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Physical Development</h3>
              <p className="text-gray-700">
                Coordination, balance, agility, and motor skills through fun basketball activities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Social Skills</h3>
              <p className="text-gray-700">
                Teamwork, communication, sportsmanship, and respect for teammates and opponents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Basketball Program?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the opportunity to learn, grow, and have fun with our expert coaches.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <a href="tel:2012333333">Call Us: (201) 233-3333</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/policy">Parent Policy</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
