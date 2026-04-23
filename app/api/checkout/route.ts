import { NextResponse } from "next/server"
import { z } from "zod"
import { getBaseUrl, getStripeClient } from "@/lib/stripe"
import { getHydratedProgramBySlug, getProgramAvailability } from "@/lib/program-service"
import { getAuthenticatedUser, getSupabaseServiceClient } from "@/lib/supabase"

const checkoutSchema = z.object({
  programSlug: z.string().min(1),
  parentFirstName: z.string().min(1),
  parentLastName: z.string().min(1),
  parentEmail: z.string().email(),
  phoneNumber: z.string().min(7),
  childName: z.string().min(1),
  childAge: z.coerce.number().int().min(2).max(13),
  waiverAccepted: z.literal(true),
  photoConsentAccepted: z.literal(true),
})

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization")

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Please log in before checking out." }, { status: 401 })
    }

    const accessToken = authorization.replace("Bearer ", "")
    const user = await getAuthenticatedUser(accessToken)
    const body = checkoutSchema.parse(await request.json())
    const program = await getHydratedProgramBySlug(body.programSlug)

    if (!program) {
      return NextResponse.json({ error: "Program not found." }, { status: 404 })
    }

    const availability = await getProgramAvailability(program.slug)

    if (availability.soldOut) {
      return NextResponse.json({ error: "This class is full. Please join the waiting list instead." }, { status: 409 })
    }

    const supabase = getSupabaseServiceClient()
    const { data: programRecord, error: programRecordError } = await supabase
      .from("programs")
      .select("id")
      .eq("slug", program.slug)
      .single<{ id: string }>()

    if (programRecordError) {
      throw programRecordError
    }

    const reservationExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

    const { error: profileError } = await supabase.from("parent_profiles").upsert({
      id: user.id,
      email: body.parentEmail.toLowerCase(),
      first_name: body.parentFirstName,
      last_name: body.parentLastName,
      phone: body.phoneNumber,
    })

    if (profileError) {
      throw profileError
    }

    const { data: existing } = await supabase
      .from("registrations")
      .select("id,status,reservation_expires_at")
      .eq("program_id", programRecord.id)
      .eq("user_id", user.id)
      .eq("child_name", body.childName)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existing?.status === "paid") {
      return NextResponse.json({ error: "This child is already registered for this class." }, { status: 409 })
    }

    if (
      existing?.status === "pending_payment" &&
      existing.reservation_expires_at &&
      new Date(existing.reservation_expires_at) > new Date()
    ) {
      return NextResponse.json({ error: "A checkout session is already active for this child. Please complete that payment first." }, { status: 409 })
    }

    const { data: registration, error: registrationError } = await supabase
      .from("registrations")
      .insert({
        program_id: programRecord.id,
        user_id: user.id,
        parent_first_name: body.parentFirstName,
        parent_last_name: body.parentLastName,
        parent_email: body.parentEmail.toLowerCase(),
        phone_number: body.phoneNumber,
        child_name: body.childName,
        child_age: body.childAge,
        liability_accepted: body.waiverAccepted,
        photo_consent_accepted: body.photoConsentAccepted,
        status: "pending_payment",
        reservation_expires_at: reservationExpiresAt,
        program_fee: program.programFee,
        organization_fee: program.organizationFee,
        total_fee: program.totalFee,
      })
      .select("id")
      .single<{ id: string }>()

    if (registrationError) {
      throw registrationError
    }

    const origin = request.headers.get("origin") ?? undefined
    const stripe = getStripeClient()
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${getBaseUrl(origin)}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl(origin)}/register?program=${program.slug}&cancelled=1`,
      customer_email: body.parentEmail.toLowerCase(),
      metadata: {
        registrationId: registration.id,
        programSlug: program.slug,
        userId: user.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: program.title,
            },
            unit_amount: program.totalFee * 100,
          },
        },
      ],
    })

    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", registration.id)

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to start checkout.",
      },
      { status: 400 }
    )
  }
}
