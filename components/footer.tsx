import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <Logo />
            <p className="mt-4 text-gray-400">
              Building champions for life through quality sports programs for children ages 3-10.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/soccer" className="text-gray-400 hover:text-red-500 transition-colors">
                  Soccer
                </Link>
              </li>
              <li>
                <Link href="/basketball" className="text-gray-400 hover:text-red-500 transition-colors">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/mma" className="text-gray-400 hover:text-red-500 transition-colors">
                  MMA/Boxing/Wrestling
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mission" className="text-gray-400 hover:text-red-500 transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                {/* <Link href="/mission#staff" className="text-gray-400 hover:text-red-500 transition-colors">
                  Our Staff
                </Link> */}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-red-500" />
                (201) 233-3333
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-red-500" />
                korakickz@gmail.com
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                {/* <MapPin size={16} className="text-red-500 mt-1" />
                <span>Address coming soon</span> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Korakickz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

