"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistForm } from "@/components/waitlist-form"
import {
  UNAVAILABLE_AVAILABILITY_MESSAGE,
  defaultAvailability,
  unavailableAvailability,
  type ProgramAvailability,
  type ProgramGroup,
} from "@/lib/programs"

type Props = {
  group: ProgramGroup
}

export function ClassTimeSelection({ group }: Props) {
  const [availabilities, setAvailabilities] = useState<Record<string, ProgramAvailability>>(
    Object.fromEntries(group.programs.map((program) => [program.slug, defaultAvailability]))
  )

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

    return () => {
      active = false
    }
  }, [group.programs])

  const hasUnavailableTime = group.programs.some(
    (program) => availabilities[program.slug]?.message === UNAVAILABLE_AVAILABILITY_MESSAGE
  )
  const hasOpenTime = group.programs.some(
    (program) => !availabilities[program.slug]?.soldOut && availabilities[program.slug]?.message !== UNAVAILABLE_AVAILABILITY_MESSAGE
  )

  return (
    <div className="space-y-8">
      {!hasOpenTime ? (
        <Card className="border-red-100 shadow-sm">
          <CardContent className="p-6 text-sm text-gray-700">
            {hasUnavailableTime
              ? "Registration is temporarily unavailable. Please try again later."
              : "All class options are currently full. You can join the waitlist for a specific class below."}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {group.programs.map((program) => {
          const availability = availabilities[program.slug] ?? defaultAvailability

          return (
            <Card key={program.slug} className="border-red-100 shadow-sm">
              <CardHeader className="space-y-3">
                <div className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${availability.message === UNAVAILABLE_AVAILABILITY_MESSAGE ? "bg-gray-200 text-gray-700" : availability.soldOut ? "bg-black text-white" : availability.remaining <= 2 ? "bg-red-600 text-white" : "bg-red-100 text-red-700"}`}>
                  {availability.message}
                </div>
                <CardTitle className="text-2xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <p>{program.timeLabel}</p>
                <p>{program.dateRangeLabel}</p>
                <p>{program.locationName}</p>
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Program Fee</span>
                  <span className="font-semibold">${program.programFee}</span>
                </div>
                {program.organizationFee > 0 ? (
                  <div className="flex items-center justify-between border-b pb-2">
                    <span>Organization &amp; Management Fee</span>
                    <span className="font-semibold">${program.organizationFee}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between text-base font-semibold text-black">
                  <span>Total</span>
                  <span>${program.totalFee}</span>
                </div>

                {availability.message === UNAVAILABLE_AVAILABILITY_MESSAGE ? (
                  <Button type="button" className="w-full" disabled>
                    Temporarily Unavailable
                  </Button>
                ) : !availability.soldOut ? (
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                    <Link href={`/register?program=${program.slug}`}>Choose This Class</Link>
                  </Button>
                ) : (
                  <WaitlistForm
                    programSlug={program.slug}
                    requestedTimes={[`${program.title} - ${program.timeLabel}`]}
                    title={`Join the waitlist for ${program.title}`}
                  />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
