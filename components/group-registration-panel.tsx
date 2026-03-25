"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistForm } from "@/components/waitlist-form"
import { defaultAvailability, type ProgramAvailability, type ProgramDefinition, type ProgramGroup } from "@/lib/programs"

type Props = {
  group: ProgramGroup
}

export function GroupRegistrationPanel({ group }: Props) {
  const [availabilities, setAvailabilities] = useState<Record<string, ProgramAvailability>>(
    Object.fromEntries(group.programs.map((program) => [program.slug, defaultAvailability]))
  )
  const [showWaitlist, setShowWaitlist] = useState(false)

  useEffect(() => {
    let active = true

    const loadAvailability = async () => {
      try {
        const responses = await Promise.all(
          group.programs.map(async (program) => {
            const response = await fetch(`/api/programs/${program.slug}`, {
              cache: "no-store",
            })

            if (!response.ok) {
              return [program.slug, defaultAvailability] as const
            }

            return [program.slug, (await response.json()) as ProgramAvailability] as const
          })
        )

        if (active) {
          setAvailabilities(Object.fromEntries(responses))
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
  }, [group.programs])

  const availablePrograms = useMemo(
    () => group.programs.filter((program) => !availabilities[program.slug]?.soldOut),
    [availabilities, group.programs]
  )

  const allSoldOut = availablePrograms.length === 0
  const timeLabels = group.programs.map((program) => program.timeLabel)

  return (
    <Card className="border-red-100 shadow-lg">
      <CardHeader className="space-y-3">
        <div className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${allSoldOut ? "bg-black text-white" : "bg-red-100 text-red-700"}`}>
          {allSoldOut ? "All Class Times Are Full" : `${availablePrograms.length} class time${availablePrograms.length > 1 ? "s" : ""} available`}
        </div>
        <CardTitle className="text-3xl">{group.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-sm text-gray-700">
          {group.programs.map((program: ProgramDefinition) => (
            <div key={program.slug} className="flex items-center justify-between border-b pb-2">
              <span>{program.timeLabel}</span>
              <span className={`font-semibold ${availabilities[program.slug]?.soldOut ? "text-black" : "text-red-600"}`}>
                {availabilities[program.slug]?.message ?? defaultAvailability.message}
              </span>
            </div>
          ))}
        </div>

        {!allSoldOut ? (
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?group=${group.slug}`}>Register</Link>
            </Button>
            <p className="text-sm text-gray-600">
              Choose from the currently available class times after clicking register.
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
              Join Waitlist
            </Button>
            <p className="text-sm text-gray-600">
              There are no available class times right now. Choose the class time or times you want to waitlist for.
            </p>
          </div>
        )}

        {showWaitlist ? (
          <WaitlistForm
            programSlug={group.programs[0].slug}
            requestedTimes={timeLabels}
            title="Join the waitlist for your preferred class time(s)"
          />
        ) : null}
      </CardContent>
    </Card>
  )
}
