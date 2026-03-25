import { NextResponse } from "next/server"
import { getAuthenticatedUser, getSupabaseServiceClient } from "@/lib/supabase"

type RegistrationRow = {
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
}

type WaitlistRow = {
  id: string
  parent_name: string
  email: string
  created_at: string
  programs: {
    title: string
    date_range_label: string
  } | null
}

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization")

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Please log in to view your dashboard." }, { status: 401 })
    }

    const accessToken = authorization.replace("Bearer ", "")
    const user = await getAuthenticatedUser(accessToken)
    const supabase = getSupabaseServiceClient()

    const { data: profile, error: profileError } = await supabase
      .from("parent_profiles")
      .select("first_name,last_name,email,phone")
      .eq("id", user.id)
      .maybeSingle()

    if (profileError) {
      throw profileError
    }

    const { data: registrations, error: registrationsError } = await supabase
      .from("registrations")
      .select("id,child_name,child_age,status,total_fee,created_at,programs(title,date_range_label,time_label,location_name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (registrationsError) {
      throw registrationsError
    }

    const userEmail = (profile?.email || user.email || "").toLowerCase()
    const waitlistQuery = supabase
      .from("waitlist_entries")
      .select("id,parent_name,email,created_at,programs(title,date_range_label)")
      .order("created_at", { ascending: false })

    const { data: waitlistEntries, error: waitlistError } = userEmail
      ? await waitlistQuery.eq("email", userEmail)
      : await waitlistQuery.limit(0)

    if (waitlistError) {
      throw waitlistError
    }

    const normalizedRegistrations: RegistrationRow[] = (registrations ?? []).map((registration) => ({
      id: registration.id,
      child_name: registration.child_name,
      child_age: registration.child_age,
      status: registration.status,
      total_fee: registration.total_fee,
      created_at: registration.created_at,
      programs: Array.isArray(registration.programs) ? registration.programs[0] ?? null : registration.programs,
    }))

    const normalizedWaitlistEntries: WaitlistRow[] = (waitlistEntries ?? []).map((entry) => ({
      id: entry.id,
      parent_name: entry.parent_name,
      email: entry.email,
      created_at: entry.created_at,
      programs: Array.isArray(entry.programs) ? entry.programs[0] ?? null : entry.programs,
    }))

    return NextResponse.json({
      email: user.email,
      profile: profile ?? null,
      registrations: normalizedRegistrations,
      waitlistEntries: normalizedWaitlistEntries,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load your account.",
      },
      { status: 400 }
    )
  }
}
