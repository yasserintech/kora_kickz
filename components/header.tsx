"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "./logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link href="/mission" className="text-white hover:text-red-500 transition-colors">
              Mission & Staff
            </Link>
            <Link href="/soccer" className="text-white hover:text-red-500 transition-colors">
              Soccer
            </Link>
            <Link href="/basketball" className="text-white hover:text-red-500 transition-colors">
              Basketball
            </Link>
            <Link href="/mma" className="text-white hover:text-red-500 transition-colors">
              MMA/Boxing/Wrestling
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/mission"
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Mission & Staff
              </Link>
              <Link
                href="/soccer"
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Soccer
              </Link>
              <Link
                href="/basketball"
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Basketball
              </Link>
              <Link
                href="/mma"
                className="text-white hover:text-red-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                MMA/Boxing/Wrestling
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

