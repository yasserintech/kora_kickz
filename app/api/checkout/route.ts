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
    const verifiedEmail = user.email?.trim().toLowerCase()
    const normalizedChildName = body.childName.trim()
    const normalizedParentFirstName = body.parentFirstName.trim()
    const normalizedParentLastName = body.parentLastName.trim()
    const normalizedPhoneNumber = body.phoneNumber.trim()

    if (!program) {
      return NextResponse.json({ error: "Program not found." }, { status: 404 })
    }

    if (!verifiedEmail) {
      return NextResponse.json({ error: "Your account is missing a verified email address." }, { status: 400 })
    }

    let availability

    try {
      availability = await getProgramAvailability(program.slug)
    } catch {
      return NextResponse.json({ error: "Registration is temporarily unavailable. Please try again shortly." }, { status: 503 })
    }

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
      email: verifiedEmail,
      first_name: normalizedParentFirstName,
      last_name: normalizedParentLastName,
      phone: normalizedPhoneNumber,
    })

    if (profileError) {
      throw profileError
    }

    const { data: registrationId, error: reservationError } = await supabase.rpc("reserve_registration", {
      p_program_id: programRecord.id,
      p_user_id: user.id,
      p_parent_first_name: normalizedParentFirstName,
      p_parent_last_name: normalizedParentLastName,
      p_parent_email: verifiedEmail,
      p_phone_number: normalizedPhoneNumber,
      p_child_name: normalizedChildName,
      p_child_age: body.childAge,
      p_liability_accepted: body.waiverAccepted,
      p_photo_consent_accepted: body.photoConsentAccepted,
      p_program_fee: program.programFee,
      p_organization_fee: program.organizationFee,
      p_total_fee: program.totalFee,
      p_reservation_expires_at: reservationExpiresAt,
    })

    if (reservationError || !registrationId) {
      throw reservationError ?? new Error("Unable to reserve a spot for this class.")
    }

    const origin = request.headers.get("origin") ?? undefined
    const stripe = getStripeClient()
    const idempotencyKey = `checkout:${user.id}:${program.slug}:${normalizedChildName.toLowerCase()}`
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${getBaseUrl(origin)}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getBaseUrl(origin)}/register?program=${program.slug}&cancelled=1`,
      customer_email: verifiedEmail,
      metadata: {
        registrationId: registrationId,
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
    }, {
      idempotencyKey,
    })

    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", registrationId)

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
