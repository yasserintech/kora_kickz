"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistForm } from "@/components/waitlist-form"
import { defaultAvailability, type ProgramAvailability, type ProgramDefinition } from "@/lib/programs"

type Props = {
  program: ProgramDefinition
  initialAvailability?: ProgramAvailability
  compact?: boolean
}

export function ProgramAvailabilityPanel({ program, initialAvailability = defaultAvailability, compact = false }: Props) {
  const [availability, setAvailability] = useState<ProgramAvailability>(initialAvailability)
  const [showWaitlist, setShowWaitlist] = useState(initialAvailability.soldOut)

  useEffect(() => {
    let active = true

    const loadAvailability = async () => {
      try {
        const response = await fetch(`/api/programs/${program.slug}`, {
          cache: "no-store",
        })

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as ProgramAvailability

        if (active) {
          setAvailability(data)
          setShowWaitlist(data.soldOut)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadAvailability()
    const interval = window.setInterval(loadAvailability, 20000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [program.slug])

  const badgeTone = useMemo(() => {
    if (availability.soldOut) {
      return "bg-black text-white"
    }

    if (availability.remaining <= 2) {
      return "bg-red-600 text-white"
    }

    return "bg-red-100 text-red-700"
  }, [availability.remaining, availability.soldOut])

  return (
    <Card className="border-red-100 shadow-lg">
      <CardHeader className={compact ? "space-y-3 pb-4" : "space-y-4"}>
        <div className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${badgeTone}`}>
          {availability.message}
        </div>
        <CardTitle className={compact ? "text-2xl" : "text-3xl"}>{program.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-between border-b pb-3">
            <span>Program Fee</span>
            <span className="font-semibold">${program.programFee}</span>
          </div>
          {program.organizationFee > 0 ? (
            <div className="flex items-center justify-between border-b pb-3">
              <span>Organization &amp; Management Fee</span>
              <span className="font-semibold">${program.organizationFee}</span>
            </div>
          ) : null}
          <div className="flex items-center justify-between text-base font-semibold text-black">
            <span>Total</span>
            <span>${program.totalFee}</span>
          </div>
        </div>

        {!availability.soldOut ? (
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?program=${program.slug}`}>{program.registerLabel}</Link>
            </Button>
            <p className="text-sm text-gray-600">
              Add this class to cart, create or log into your account, complete the waiver, and pay online.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full border-black text-black hover:bg-black hover:text-white"
              onClick={() => setShowWaitlist((current) => !current)}
            >
              Join Waiting List
            </Button>
            <p className="text-sm text-gray-600">
              This class is currently full. Parents can join the waiting list and we will reach out if a spot opens.
            </p>
          </div>
        )}

        {showWaitlist ? <WaitlistForm programSlug={program.slug} /> : null}
      </CardContent>
    </Card>
  )
}
