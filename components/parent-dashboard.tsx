"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSupabaseBrowserClient } from "@/lib/supabase"

type AuthMode = "signup" | "login"

type DashboardData = {
  email: string | null
  profile: {
    first_name?: string | null
    last_name?: string | null
    email?: string | null
    phone?: string | null
  } | null
  registrations: Array<{
    id: string
    child_name: string
    child_age: number
    status: string
    total_fee: number
    created_at: string
    programs: {
      title: string
      date_range_label: string
      time_label: string
      location_name: string
    } | null
  }>
  waitlistEntries: Array<{
    id: string
    parent_name: string
    email: string
    created_at: string
    programs: {
      title: string
      date_range_label: string
    } | null
  }>
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatStatus(status: string) {
  if (status === "paid") {
    return {
      label: "Registered & Paid",
      className: "bg-green-100 text-green-800 border-green-200",
    }
  }

  if (status === "pending_payment") {
    return {
      label: "Checkout In Progress",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    }
  }

  if (status === "expired") {
    return {
      label: "Expired",
      className: "bg-gray-100 text-gray-700 border-gray-200",
    }
  }

  return {
    label: status,
    className: "bg-gray-100 text-gray-700 border-gray-200",
  }
}

export function ParentDashboard() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), [])
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [sessionReady, setSessionReady] = useState(false)
  const [loggedInEmail, setLoggedInEmail] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState("")
  const [authMessage, setAuthMessage] = useState("")
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState("")
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    let active = true

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) {
        return
      }

      if (session?.user?.email) {
        setLoggedInEmail(session.user.email)
        setEmail(session.user.email)
        await loadDashboard(session.access_token)
      }

      setSessionReady(true)
    }

    initialize().catch((error) => {
      setDashboardError(error instanceof Error ? error.message : "Unable to load your account.")
      setSessionReady(true)
    })

    return () => {
      active = false
    }
  }, [supabase])

  async function loadDashboard(accessToken: string) {
    setDashboardLoading(true)
    setDashboardError("")

    try {
      const response = await fetch("/api/account", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load your dashboard.")
      }

      setDashboard(payload)
    } catch (error) {
      setDashboardError(error instanceof Error ? error.message : "Unable to load your dashboard.")
    } finally {
      setDashboardLoading(false)
    }
  }

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthLoading(true)
    setAuthError("")
    setAuthMessage("")

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          throw error
        }

        if (!data.session) {
          setAuthMessage("Your account was created. If email confirmation is enabled, confirm your email and then log in.")
        } else {
          setLoggedInEmail(data.user?.email ?? email)
          await loadDashboard(data.session.access_token)
          setAuthMessage("Account created successfully.")
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          throw error
        }

        setLoggedInEmail(data.user.email ?? email)
        await loadDashboard(data.session.access_token)
        setAuthMessage("Signed in successfully.")
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to authenticate.")
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setLoggedInEmail("")
    setDashboard(null)
    setAuthMessage("")
    setDashboardError("")
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordLoading(true)
    setPasswordMessage("")
    setPasswordError("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const currentEmail = user?.email || loggedInEmail || email

      if (!currentEmail) {
        throw new Error("Please log in again before changing your password.")
      }

      if (newPassword.length < 6) {
        throw new Error("Please choose a password with at least 6 characters.")
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match.")
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: currentPassword,
      })

      if (signInError) {
        throw new Error("Current password is incorrect.")
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) {
        throw updateError
      }

      setPasswordMessage("Password updated successfully.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (changePasswordError) {
      setPasswordError(changePasswordError instanceof Error ? changePasswordError.message : "Unable to change password.")
    } finally {
      setPasswordLoading(false)
    }
  }

  const displayName = dashboard?.profile?.first_name
    ? `${dashboard.profile.first_name}${dashboard.profile.last_name ? ` ${dashboard.profile.last_name}` : ""}`
    : loggedInEmail

  if (!loggedInEmail) {
    return (
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Parent Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                type="button"
                variant={authMode === "login" ? "default" : "outline"}
                className={authMode === "login" ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setAuthMode("login")}
              >
                Log In
              </Button>
              <Button type="button" variant={authMode === "signup" ? "default" : "outline"} onClick={() => setAuthMode("signup")}>
                Create Account
              </Button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dashboard-email">Email Address</Label>
                <Input id="dashboard-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dashboard-password">Password</Label>
                <Input
                  id="dashboard-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={!sessionReady || authLoading}>
                {authLoading ? "Please wait..." : authMode === "login" ? "Log In" : "Create Account"}
              </Button>
            </form>

            <p className="text-sm text-gray-600">
              <Link href="/account/reset-password" className="font-semibold text-red-600 underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </p>

            {authMessage ? <p className="text-sm text-green-700">{authMessage}</p> : null}
            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
          </CardContent>
        </Card>

        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">What Parents Can See</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <p>Your dashboard gives each parent a simple place to confirm their class activity after signing in.</p>
            <p>It includes their registered child or children, class names, payment and registration status, and any waiting list entries tied to their account email.</p>
            <p>
              Need to register first? Visit{" "}
              <Link href="/soccer/find-my-class" className="font-semibold text-red-600 underline-offset-4 hover:underline">
                Soccer → Find My Class
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">My Account</p>
          <h2 className="mt-2 text-3xl font-bold text-black">{displayName}</h2>
          <p className="mt-2 text-sm text-gray-700">{dashboard?.profile?.email || loggedInEmail}</p>
          {dashboard?.profile?.phone ? <p className="text-sm text-gray-700">{dashboard.profile.phone}</p> : null}
        </div>
        <Button type="button" variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-red-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Registered Classes</p>
            <p className="mt-2 text-3xl font-bold text-black">{dashboard?.registrations.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="border-red-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Paid Registrations</p>
            <p className="mt-2 text-3xl font-bold text-black">
              {dashboard?.registrations.filter((registration) => registration.status === "paid").length ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card className="border-red-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Waitlist Entries</p>
            <p className="mt-2 text-3xl font-bold text-black">{dashboard?.waitlistEntries.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Registered Children & Classes</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardLoading ? <p className="text-sm text-gray-600">Loading registrations...</p> : null}
          {!dashboardLoading && dashboard?.registrations.length === 0 ? (
            <p className="text-sm text-gray-600">No registrations yet. Once you complete checkout, your class will appear here.</p>
          ) : null}
          {!dashboardLoading && dashboard?.registrations.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Child</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Schedule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.registrations.map((registration) => {
                  const status = formatStatus(registration.status)

                  return (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div className="font-medium text-black">{registration.child_name}</div>
                        <div className="text-xs text-gray-500">Age {registration.child_age}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-black">{registration.programs?.title ?? "Program"}</div>
                        <div className="text-xs text-gray-500">{registration.programs?.location_name ?? ""}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(registration.total_fee)}</TableCell>
                      <TableCell>
                        <div>{registration.programs?.date_range_label ?? ""}</div>
                        <div className="text-xs text-gray-500">{registration.programs?.time_label ?? ""}</div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-red-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Waiting List Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardLoading ? <p className="text-sm text-gray-600">Loading waiting list activity...</p> : null}
          {!dashboardLoading && dashboard?.waitlistEntries.length === 0 ? (
            <p className="text-sm text-gray-600">No waiting list entries yet.</p>
          ) : null}
          {!dashboardLoading && dashboard?.waitlistEntries.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard.waitlistEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="font-medium text-black">{entry.programs?.title ?? "Program"}</div>
                      <div className="text-xs text-gray-500">{entry.programs?.date_range_label ?? ""}</div>
                    </TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{new Date(entry.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
          {dashboardError ? <p className="mt-4 text-sm text-red-600">{dashboardError}</p> : null}
        </CardContent>
      </Card>

      <Card className="border-red-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleChangePassword} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-new-password">New Password</Label>
              <Input
                id="account-new-password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-account-new-password">Confirm New Password</Label>
              <Input
                id="confirm-account-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                required
              />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={passwordLoading}>
                {passwordLoading ? "Updating Password..." : "Change Password"}
              </Button>
            </div>
          </form>
          <p className="text-sm text-gray-600">
            If a parent forgets their current password, they can use{" "}
            <Link href="/account/reset-password" className="font-semibold text-red-600 underline-offset-4 hover:underline">
              the password reset flow
            </Link>
            .
          </p>
          {passwordMessage ? <p className="text-sm text-green-700">{passwordMessage}</p> : null}
          {passwordError ? <p className="text-sm text-red-600">{passwordError}</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}
