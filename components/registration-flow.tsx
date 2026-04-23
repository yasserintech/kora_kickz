"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import {
  PHOTO_CONSENT_COPY,
  TEMPORARY_WAIVER_COPY,
  defaultAvailability,
  type ProgramAvailability,
  type ProgramDefinition,
} from "@/lib/programs"
import { WaitlistForm } from "@/components/waitlist-form"

type Props = {
  program: ProgramDefinition
  initialAvailability: ProgramAvailability
}

type AuthMode = "signup" | "login"

export function RegistrationFlow({ program, initialAvailability }: Props) {
  const searchParams = useSearchParams()
  const [authMode, setAuthMode] = useState<AuthMode>("signup")
  const [availability, setAvailability] = useState(initialAvailability ?? defaultAvailability)
  const [sessionReady, setSessionReady] = useState(false)
  const [loggedInEmail, setLoggedInEmail] = useState("")
  const [authMessage, setAuthMessage] = useState("")
  const [authError, setAuthError] = useState("")
  const [checkoutError, setCheckoutError] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [parentFirstName, setParentFirstName] = useState("")
  const [parentLastName, setParentLastName] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [childName, setChildName] = useState("")
  const [childAge, setChildAge] = useState("")
  const [waiverAccepted, setWaiverAccepted] = useState(false)
  const [photoConsentAccepted, setPhotoConsentAccepted] = useState(false)
  const [loadError, setLoadError] = useState("")

  const cancelled = searchParams.get("cancelled") === "1"
  const supabase = useMemo(() => getSupabaseBrowserClient(), [])

  useEffect(() => {
    let active = true

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) {
        return
      }

      if (session?.user) {
        setLoggedInEmail(session.user.email ?? "")
        setParentEmail((current) => current || session.user.email || "")

        const { data: profile } = await supabase
          .from("parent_profiles")
          .select("first_name,last_name,phone,email")
          .eq("id", session.user.id)
          .maybeSingle()

        if (profile) {
          setParentFirstName((current) => current || profile.first_name || "")
          setParentLastName((current) => current || profile.last_name || "")
          setPhoneNumber((current) => current || profile.phone || "")
          setParentEmail((current) => current || profile.email || session.user.email || "")
        }
      }

      setSessionReady(true)
    }

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
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadSession().catch((error) => {
      setLoadError(error instanceof Error ? error.message : "Unable to load your account.")
      setSessionReady(true)
    })
    loadAvailability()

    return () => {
      active = false
    }
  }, [program.slug, supabase])

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError("")
    setAuthMessage("")

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parentEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
          },
        })

        if (error) {
          throw error
        }

        if (!data.session) {
          setAuthMessage("We’ve sent you a confirmation email. Please verify your account, then log in to finish registration.")
        } else {
          setLoggedInEmail(data.user?.email ?? parentEmail)
          setAuthMessage("Account created. You can continue with registration below.")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: parentEmail,
          password,
        })

        if (error) {
          throw error
        }

        setLoggedInEmail(data.user.email ?? parentEmail)
        setAuthMessage("You are logged in and ready to check out.")
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to authenticate.")
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCheckoutLoading(true)
    setCheckoutError("")

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error("Please create an account or log in before checking out.")
      }

      if (!waiverAccepted) {
        throw new Error("You must agree to the liability waiver before continuing.")
      }

      if (!photoConsentAccepted) {
        throw new Error("You must agree to the picture consent before continuing.")
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          programSlug: program.slug,
          parentFirstName,
          parentLastName,
          parentEmail,
          phoneNumber,
          childName,
          childAge,
          waiverAccepted,
          photoConsentAccepted,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to start checkout.")
      }

      window.location.href = payload.url
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Unable to start checkout.")
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Step 1: Add To Cart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <p className="text-lg font-semibold text-black">{program.title}</p>
              <p className="text-sm text-gray-700">{program.dateRangeLabel}</p>
              <p className="text-sm text-gray-700">{program.timeLabel}</p>
            </div>
            <div className="space-y-2 text-sm">
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
            </div>
            {cancelled ? <p className="text-sm text-red-600">Checkout was canceled. Your cart is still ready if you want to complete registration.</p> : null}
          </CardContent>
        </Card>

        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Step 2: Create An Account Or Log In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={authMode === "signup" ? "default" : "outline"}
                className={authMode === "signup" ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setAuthMode("signup")}
              >
                Create Account
              </Button>
              <Button type="button" variant={authMode === "login" ? "default" : "outline"} onClick={() => setAuthMode("login")}>
                Log In
              </Button>
            </div>

            <form onSubmit={handleAuth} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="parent-email">Email Address</Label>
                <Input
                  id="parent-email"
                  type="email"
                  value={parentEmail}
                  onChange={(event) => setParentEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="parent-password">Password</Label>
                <Input
                  id="parent-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={authLoading}>
                  {authLoading ? "Please wait..." : authMode === "signup" ? "Create Account" : "Log In"}
                </Button>
              </div>
            </form>

            {loggedInEmail ? <p className="text-sm text-green-700">Signed in as {loggedInEmail}</p> : null}
            {authMessage ? <p className="text-sm text-green-700">{authMessage}</p> : null}
            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
            {loadError ? <p className="text-sm text-red-600">{loadError}</p> : null}
          </CardContent>
        </Card>

        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Steps 3–8: Parent, Child, Consent, And Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="parent-first-name">Parent First Name</Label>
                  <Input
                    id="parent-first-name"
                    value={parentFirstName}
                    onChange={(event) => setParentFirstName(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-last-name">Parent Last Name</Label>
                  <Input
                    id="parent-last-name"
                    value={parentLastName}
                    onChange={(event) => setParentLastName(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-phone">Phone Number</Label>
                  <Input
                    id="parent-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-email-confirm">Email Address</Label>
                  <Input
                    id="parent-email-confirm"
                    type="email"
                    value={parentEmail}
                    onChange={(event) => setParentEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-name">Child Name</Label>
                  <Input id="child-name" value={childName} onChange={(event) => setChildName(event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-age">Child Age</Label>
                  <Input
                    id="child-age"
                    type="number"
                    min={2}
                    max={13}
                    value={childAge}
                    onChange={(event) => setChildAge(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-lg font-semibold text-black">Liability Waiver and Photo Consent</h3>
                <p className="mt-2 text-sm text-gray-700">{TEMPORARY_WAIVER_COPY}</p>
                <div className="mt-4 flex items-start gap-3">
                  <Checkbox
                    id="waiver"
                    checked={waiverAccepted}
                    onCheckedChange={(checked) => setWaiverAccepted(Boolean(checked))}
                  />
                  <Label htmlFor="waiver" className="text-sm leading-6 text-gray-700">
                    {program.waiverLabel}
                  </Label>
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <Checkbox
                    id="photo-consent"
                    checked={photoConsentAccepted}
                    onCheckedChange={(checked) => setPhotoConsentAccepted(Boolean(checked))}
                  />
                  <Label htmlFor="photo-consent" className="text-sm leading-6 text-gray-700">
                    {PHOTO_CONSENT_COPY}
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={!sessionReady || !loggedInEmail || checkoutLoading || availability.soldOut}
              >
                {checkoutLoading ? "Redirecting To Checkout..." : `Pay $${program.totalFee} And Complete Registration`}
              </Button>

              {checkoutError ? <p className="text-sm text-red-600">{checkoutError}</p> : null}
              {!loggedInEmail ? <p className="text-sm text-gray-600">Create an account or log in first to unlock checkout.</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Registration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className={`inline-flex rounded-full px-3 py-1 font-semibold ${availability.soldOut ? "bg-black text-white" : availability.remaining <= 2 ? "bg-red-600 text-white" : "bg-red-100 text-red-700"}`}>
              {availability.message}
            </div>
            <div>
              <p className="font-semibold text-black">Program Dates</p>
              <p>{program.dateRangeLabel}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Total Sessions</p>
              <p>{program.sessionsLabel}</p>
              <p>{program.noClassLabel}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Class Time</p>
              <p>{program.timeLabel}</p>
            </div>
            <div>
              <p className="font-semibold text-black">Location</p>
              <p>{program.locationName}</p>
              <p>{program.locationAddress}</p>
            </div>
            <div>
              <p className="font-semibold text-black">What To Bring To Class</p>
              <ul className="mt-2 space-y-1">
                {program.bringItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold text-black">Overall Flow</p>
              <p className="mt-2">1. Select the program</p>
              <p>2. Add it to cart</p>
              <p>3. Create an account or log in</p>
              <p>4. Fill out parent and child information</p>
              <p>5. Agree to the liability waiver</p>
              <p>6. Agree to the picture consent</p>
              <p>{`7. Pay the $${program.totalFee} total fee`}</p>
              <p>8. Receive confirmation</p>
            </div>
          </CardContent>
        </Card>

        {availability.soldOut ? (
          <Card className="border-red-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Waiting List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                This class is currently full. Join the waiting list and we will contact you if a spot opens.
              </p>
              <WaitlistForm
                programSlug={program.slug}
                requestedTimes={[program.timeLabel]}
                title={`Join the waitlist for the ${program.timeLabel} class`}
              />
            </CardContent>
          </Card>
        ) : null}

        <p className="text-sm text-gray-600">
          Need to review the class first? Visit{" "}
          <Link href="/soccer/registration" className="font-semibold text-red-600 underline-offset-4 hover:underline">
            Soccer → Registration
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
