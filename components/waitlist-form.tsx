"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  programSlug: string
  requestedTimes?: string[]
  title?: string
}

export function WaitlistForm({ programSlug, requestedTimes = [], title }: Props) {
  const [parentName, setParentName] = useState("")
  const [email, setEmail] = useState("")
  const [selectedTimes, setSelectedTimes] = useState<string[]>(requestedTimes)
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("submitting")
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programSlug,
          parentName,
          email,
          requestedTimes: selectedTimes,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to join the waiting list.")
      }

      setState("success")
      setMessage("You have been added to the waiting list.")
      setParentName("")
      setEmail("")
      setSelectedTimes(requestedTimes)
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Unable to join the waiting list.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      {title ? <p className="text-sm font-semibold text-black">{title}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`waitlist-name-${programSlug}`}>Parent Name</Label>
          <Input
            id={`waitlist-name-${programSlug}`}
            value={parentName}
            onChange={(event) => setParentName(event.target.value)}
            required
            placeholder="Parent first and last name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`waitlist-email-${programSlug}`}>Email</Label>
          <Input
            id={`waitlist-email-${programSlug}`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="parent@email.com"
          />
        </div>
      </div>
      {requestedTimes.length ? (
        <div className="space-y-2">
          <Label>Preferred Class Time</Label>
          <div className="space-y-2">
            {requestedTimes.map((time) => {
              const checked = selectedTimes.includes(time)

              return (
                <label key={time} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      setSelectedTimes((current) =>
                        event.target.checked ? [...current, time] : current.filter((item) => item !== time)
                      )
                    }}
                  />
                  <span>{time}</span>
                </label>
              )
            })}
          </div>
        </div>
      ) : null}
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={state === "submitting"}>
        {state === "submitting" ? "Joining Waiting List..." : "Join Waiting List"}
      </Button>
      {message ? <p className={state === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>{message}</p> : null}
    </form>
  )
}
