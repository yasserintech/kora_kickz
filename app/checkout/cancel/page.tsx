import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Checkout Canceled</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black">Your registration was not completed.</h1>
          <p className="mt-4 text-lg text-gray-700">
            You can return to the registration page at any time to finish checking out.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/soccer/registration">Back To Registration</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
