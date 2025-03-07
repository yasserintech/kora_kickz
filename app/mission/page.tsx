import Image from "next/image"

export default function MissionPage() {
  return (
    <main className="min-h-screen">
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Mission</h1>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Building Champions For Life</h2>
              <p className="text-gray-700 mb-4">
                At Korakickz, our mission is to provide high-quality sports programs that develop not just athletic
                skills, but also character, confidence, and a lifelong love of physical activity.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that every child, regardless of natural ability, can benefit from sports participation. Our
                programs are designed to be inclusive, supportive, and fun while teaching fundamental skills and
                concepts.
              </p>
              <p className="text-gray-700">
                Through our diverse offerings in soccer, basketball, and martial arts, we aim to help children ages 3-10
                discover their passions, build healthy habits, and develop the mental and physical tools they need to
                succeed in all areas of life.
              </p>
            </div>
            <div className="relative h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/koraaaa.webp"
                alt="Kids playing sports"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Fun & Engagement</h3>
              <p className="text-gray-700 text-center">
                We believe that children learn best when they're having fun. Our programs prioritize enjoyment while
                teaching important skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Skill Development</h3>
              <p className="text-gray-700 text-center">
                We focus on age-appropriate skill development that builds a strong foundation for future athletic
                success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Discipline & Respect</h3>
              <p className="text-gray-700 text-center">
                Success comes from consistency and integrity. We foster commitment, accountability, and respect for others in every step of the journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      {/* <section id="staff" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Staff</h2>

          <div className="grid md:grid-cols-3 gap-8"> */}
            {/* Coach 1 */}
            {/* <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <Image src="/placeholder.svg?height=400&width=400" alt="Coach" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Coach Michael</h3>
                <p className="text-gray-500 mb-4">Soccer Program Director</p>
                <p className="text-gray-700">
                  Coach Michael has over 10 years of experience coaching youth soccer and holds a USSF C License.
                </p>
              </div>
            </div> */}

            {/* Coach 2 */}
            {/* <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <Image src="/placeholder.svg?height=400&width=400" alt="Coach" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Coach Sarah</h3>
                <p className="text-gray-500 mb-4">Basketball Program Director</p>
                <p className="text-gray-700">
                  Coach Sarah is a former collegiate basketball player with a passion for teaching fundamentals to young
                  athletes.
                </p>
              </div>
            </div> */}

            {/* Coach 3 */}
            {/* <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <Image src="/placeholder.svg?height=400&width=400" alt="Coach" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Coach David</h3>
                <p className="text-gray-500 mb-4">Martial Arts Program Director</p>
                <p className="text-gray-700">
                  Coach David is a black belt with specialized training in teaching martial arts to children in a safe,
                  fun environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  )
}

