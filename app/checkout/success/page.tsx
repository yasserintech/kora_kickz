import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getStripeClient } from "@/lib/stripe"
import { getSupabaseServiceClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const resolvedSearchParams = await searchParams
  let eyebrow = "Payment Received"
  let heading = "We are finalizing your registration."
  let description = "Your payment was received successfully. We are confirming your registration now, and it should appear in your dashboard shortly."

  if (resolvedSearchParams.session_id) {
    try {
      const stripe = getStripeClient()
      const session = await stripe.checkout.sessions.retrieve(resolvedSearchParams.session_id)

      if (session.payment_status === "paid") {
        const supabase = getSupabaseServiceClient()
        const { data: registration } = await supabase
          .from("registrations")
          .select("status")
          .eq("stripe_session_id", session.id)
          .maybeSingle<{ status: string }>()

        if (registration?.status === "paid") {
          eyebrow = "Registration Confirmed"
          heading = "Your child is registered."
          description = "Payment was submitted successfully and your registration is confirmed in the KoraKickz system."
        }
      }
    } catch {
      // Fall back to the safer finalizing message.
    }
  }

  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black">{heading}</h1>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/account">Go To My Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/soccer/registration">View Registration</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
