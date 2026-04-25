"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistForm } from "@/components/waitlist-form"
import {
  UNAVAILABLE_AVAILABILITY_MESSAGE,
  defaultAvailability,
  unavailableAvailability,
  type ProgramAvailability,
  type ProgramDefinition,
  type ProgramGroup,
} from "@/lib/programs"

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
              return [program.slug, unavailableAvailability] as const
            }

            return [program.slug, (await response.json()) as ProgramAvailability] as const
          })
        )

        if (active) {
          setAvailabilities(Object.fromEntries(responses))
        }
      } catch {
        if (active) {
          setAvailabilities(Object.fromEntries(group.programs.map((program) => [program.slug, unavailableAvailability])))
        }
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
    () =>
      group.programs.filter(
        (program) => !availabilities[program.slug]?.soldOut && availabilities[program.slug]?.message !== UNAVAILABLE_AVAILABILITY_MESSAGE
      ),
    [availabilities, group.programs]
  )

  const allSoldOut = availablePrograms.length === 0
  const hasUnavailablePrograms = group.programs.some(
    (program) => availabilities[program.slug]?.message === UNAVAILABLE_AVAILABILITY_MESSAGE
  )
  const waitlistOptions = group.programs.map((program) => ({
    programSlug: program.slug,
    label: `${program.title} - ${program.timeLabel}`,
  }))

  return (
    <Card className="border-red-100 shadow-lg">
      <CardHeader className="space-y-3">
        <div className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${hasUnavailablePrograms ? "bg-gray-200 text-gray-700" : allSoldOut ? "bg-black text-white" : "bg-red-100 text-red-700"}`}>
          {hasUnavailablePrograms ? "Registration Unavailable" : allSoldOut ? "Waitlist Available" : `${availablePrograms.length} class option${availablePrograms.length > 1 ? "s" : ""} open`}
        </div>
        <CardTitle className="text-3xl">{group.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-sm text-gray-700">
          {group.programs.map((program: ProgramDefinition) => (
            <div key={program.slug} className="flex items-start justify-between gap-4 border-b pb-2">
              <div>
                <p className="font-semibold text-black">{program.title}</p>
                <p>{program.timeLabel}</p>
              </div>
              <span className={`font-semibold ${availabilities[program.slug]?.message === UNAVAILABLE_AVAILABILITY_MESSAGE ? "text-gray-600" : availabilities[program.slug]?.soldOut ? "text-black" : "text-red-600"}`}>
                {availabilities[program.slug]?.message ?? defaultAvailability.message}
              </span>
            </div>
          ))}
        </div>

        {hasUnavailablePrograms ? (
          <p className="text-sm text-gray-600">Registration is temporarily unavailable. Please try again later.</p>
        ) : !allSoldOut ? (
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
              <Link href={`/register?group=${group.slug}`}>Register</Link>
            </Button>
            <p className="text-sm text-gray-600">
              Choose the class you want to register for after clicking register.
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
              All class options are currently full. Choose the class or classes you want to join the waitlist for.
            </p>
          </div>
        )}

        {showWaitlist && !hasUnavailablePrograms ? (
          <WaitlistForm
            programSlug={group.slug}
            requestedOptions={waitlistOptions}
            title="Join the waitlist for your preferred class option(s)"
          />
        ) : null}
      </CardContent>
    </Card>
  )
}
