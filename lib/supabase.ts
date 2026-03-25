import { createBrowserClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { env, hasSupabaseEnv } from "@/lib/env"

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(env.supabaseUrl, env.supabaseAnonKey)
  }

  return browserClient
}

export function getSupabaseServiceClient() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase environment variables are not configured.")
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export async function getAuthenticatedUser(accessToken: string) {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase environment variables are not configured.")
  }

  const authClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const { data, error } = await authClient.auth.getUser(accessToken)

  if (error || !data.user) {
    throw new Error("You must be logged in before continuing.")
  }

  return data.user
}
