"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { AuthChangeEvent, Session } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase"

export function ResetPasswordFlow() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), [])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRecoveryReady, setIsRecoveryReady] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    const initializeRecovery = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          throw exchangeError
        }

        url.searchParams.delete("code")
        window.history.replaceState({}, "", url.toString())
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (active && session) {
        setIsRecoveryReady(true)
      }
    }

    initializeRecovery().catch((recoveryError) => {
      if (active) {
        setError(recoveryError instanceof Error ? recoveryError.message : "Unable to open the password reset link.")
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!active) {
        return
      }

      if (event === "PASSWORD_RECOVERY" || Boolean(session)) {
        setIsRecoveryReady(true)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [supabase])

  async function handleRequestReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsRequesting(true)
    setMessage("")
    setError("")

    try {
      const redirectTo = `${window.location.origin}/account/reset-password`
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      if (resetError) {
        throw resetError
      }

      setMessage("Password reset email sent. Use the link in your inbox to set a new password.")
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to send password reset email.")
    } finally {
      setIsRequesting(false)
    }
  }

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsUpdating(true)
    setMessage("")
    setError("")

    try {
      if (password.length < 6) {
        throw new Error("Please choose a password with at least 6 characters.")
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.")
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) {
        throw updateError
      }

      setMessage("Password updated successfully. You can now return to your account.")
      setPassword("")
      setConfirmPassword("")
    } catch (updatePasswordError) {
      setError(updatePasswordError instanceof Error ? updatePasswordError.message : "Unable to update password.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="border-red-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{isRecoveryReady ? "Set A New Password" : "Forgot Password"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isRecoveryReady ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="parent@email.com"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isRequesting}>
                {isRequesting ? "Sending Reset Email..." : "Send Password Reset Email"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isUpdating}>
                {isUpdating ? "Updating Password..." : "Update Password"}
              </Button>
            </form>
          )}

          {message ? <p className="text-sm text-green-700">{message}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <p className="text-sm text-gray-600">
            Return to{" "}
            <Link href="/account" className="font-semibold text-red-600 underline-offset-4 hover:underline">
              the parent dashboard
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">How This Stays Secure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <p>Password reset emails are sent by Supabase Auth, not from a plain database table in the app.</p>
          <p>The reset link opens a secure recovery session, and the new password is updated directly through Supabase.</p>
          <p>The actual password is never stored in readable form in the KoraKickz registration tables, and it is not visible to you in the dashboard.</p>
        </CardContent>
      </Card>
    </div>
  )
}
