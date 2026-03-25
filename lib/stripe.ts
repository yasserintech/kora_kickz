import Stripe from "stripe"
import { env, hasStripeEnv } from "@/lib/env"

let stripeClient: Stripe | null = null

export function getStripeClient() {
  if (!hasStripeEnv()) {
    throw new Error("Stripe environment variables are not configured.")
  }

  if (!stripeClient) {
    stripeClient = new Stripe(env.stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    })
  }

  return stripeClient
}

export function getBaseUrl(origin?: string) {
  return origin ?? env.appUrl
}
