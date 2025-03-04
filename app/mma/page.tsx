import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function MMAPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Kids martial arts training"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">MMA/Boxing/Wrestling Program</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Building discipline, confidence, and physical fitness through martial arts
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
              <p className="text-gray-700 mb-4">
                Our martial arts program combines elements of MMA, boxing, and wrestling to provide children ages 3-10
                with a well-rounded introduction to combat sports in a safe, controlled environment.
              </p>
              <p className="text-gray-700 mb-4">
                Each session focuses on age-appropriate techniques while emphasizing discipline, respect, and
                self-control. Our experienced coaches create a structured atmosphere where children learn valuable
                self-defense skills while building confidence and physical fitness.
              </p>
              <p className="text-gray-700">
                Safety is our top priority, and all activities are carefully designed to be appropriate for each age
                group, with a focus on technique rather than contact.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Martial arts training"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Age Groups</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Little Dragons (Ages 3-4)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Introduction to basic movements</li>
                <li>• Fun games that develop coordination</li>
                <li>• Focus on listening skills and following directions</li>
                <li>• 30-minute sessions</li>
                <li>• Parent participation encouraged</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Junior Warriors (Ages 5-7)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic martial arts techniques</li>
                <li>• Introduction to stances and movement</li>
                <li>• Focus on discipline and respect</li>
                <li>• 45-minute sessions</li>
                <li>• Emphasis on self-control and focus</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-center mb-4 text-red-600">Young Champions (Ages 8-10)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• More advanced techniques</li>
                <li>• Introduction to combinations and strategy</li>
                <li>• Focus on physical fitness and conditioning</li>
                <li>• 60-minute sessions</li>
                <li>• Emphasis on goal-setting and perseverance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Teach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Teach</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">MMA Fundamentals</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic striking techniques</li>
                <li>• Introductory grappling skills</li>
                <li>• Proper stance and movement</li>
                <li>• Safe falling and rolling techniques</li>
                <li>• Focus and control exercises</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Boxing Skills</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Proper hand wrapping (for older groups)</li>
                <li>• Basic punches and combinations</li>
                <li>• Defensive techniques</li>
                <li>• Footwork and movement</li>
                <li>• Pad work and bag drills</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-600">Wrestling Techniques</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic takedowns</li>
                <li>• Sprawling and defensive moves</li>
                <li>• Proper body positioning</li>
                <li>• Balance and leverage principles</li>
                <li>• Safe practice methods</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our Program</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Self-Discipline</h3>
              <p className="text-gray-700">
                Children learn to follow instructions, control their actions, and develop focus.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Confidence</h3>
              <p className="text-gray-700">
                As skills improve, children develop greater self-confidence and self-esteem.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Physical Fitness</h3>
              <p className="text-gray-700">
                Training develops strength, flexibility, coordination, and cardiovascular health.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Respect</h3>
              <p className="text-gray-700">
                Children learn to respect themselves, their peers, their instructors, and their training space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Martial Arts Program?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the opportunity to learn valuable skills that will benefit them for life.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <a href="tel:2012333333">Call Us: (201) 233-3333</a>
          </Button>
        </div>
      </section>
    </main>
  )
}

