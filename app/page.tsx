import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Kids playing sports"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Building Champions <span className="text-red-500">For Life</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Korakickz provides quality sports programs for children ages 3-10, developing skills, confidence, and
            character.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="#programs">Explore Programs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/mission">Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section id="programs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Programs</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Soccer Program */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 bg-red-600 relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="Soccer program" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Soccer</h3>
                <p className="text-gray-700 mb-4">
                  Develop coordination, teamwork, and soccer fundamentals in a fun, supportive environment.
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/soccer">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Basketball Program */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 bg-red-600 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Basketball program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Basketball</h3>
                <p className="text-gray-700 mb-4">
                  Build basketball skills, confidence, and sportsmanship through engaging drills and games.
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/basketball">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* MMA/Boxing/Wrestling Program */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 bg-red-600 relative">
                <Image src="/placeholder.svg?height=400&width=600" alt="MMA program" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">MMA/Boxing/Wrestling</h3>
                <p className="text-gray-700 mb-4">
                  Learn discipline, self-defense, and physical fitness through age-appropriate martial arts training.
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/mma">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Korakickz?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the gift of sports, confidence, and lifelong skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <a href="tel:2012333333" className="flex items-center gap-2">
                <PhoneCall size={18} />
                Call Us: (201) 233-3333
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

