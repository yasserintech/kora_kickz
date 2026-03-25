import { NextResponse } from "next/server"
import Stripe from "stripe"
import { env } from "@/lib/env"
import { getStripeClient } from "@/lib/stripe"
import { getSupabaseServiceClient } from "@/lib/supabase"

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")

  if (!env.stripeWebhookSecret) {
    return NextResponse.json({ error: "Stripe webhook secret is not configured." }, { status: 500 })
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 })
  }

  try {
    const body = await request.text()
    const stripe = getStripeClient()
    const event = stripe.webhooks.constructEvent(body, signature, env.stripeWebhookSecret)
    const supabase = getSupabaseServiceClient()

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const registrationId = session.metadata?.registrationId

      if (registrationId) {
        const { error } = await supabase
          .from("registrations")
          .update({
            status: "paid",
            stripe_payment_intent_id:
              typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
            reservation_expires_at: null,
          })
          .eq("id", registrationId)

        if (error) {
          throw error
        }
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session
      const registrationId = session.metadata?.registrationId

      if (registrationId) {
        const { error } = await supabase
          .from("registrations")
          .update({
            status: "expired",
          })
          .eq("id", registrationId)

        if (error) {
          throw error
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to process the Stripe webhook.",
      },
      { status: 400 }
    )
  }
}
