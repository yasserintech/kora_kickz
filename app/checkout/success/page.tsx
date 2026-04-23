import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Registration Confirmed</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black">Your child is registered.</h1>
          <p className="mt-4 text-lg text-gray-700">
            Payment was submitted successfully. KoraKickz now has the parent and child information saved in the registration system.
          </p>
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
