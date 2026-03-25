import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { KORAKICKZ_AGE_COPY } from "@/lib/programs"

export const metadata: Metadata = {
  title: "Korakickz - Youth Sports Programs",
  description: `${KORAKICKZ_AGE_COPY} Explore soccer, basketball, and martial arts programs for young athletes.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
