import { NextResponse } from "next/server"
import { z } from "zod"
import { createHash } from "node:crypto"

const schema = z.object({
  name: z.string().trim().min(2).max(100), school: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254), phone: z.string().trim().min(7).max(30).regex(/^[+\d\s().-]+$/).refine(value => value.replace(/\D/g, "").length >= 7),
  ageGroup: z.enum(["Daycare / Preschool", "Elementary School", "Middle School", "High School", "Multiple Age Groups"]),
  message: z.string().trim().max(2000).default(""), website: z.string().max(200).default(""), requestId: z.string().uuid(),
})
// A best-effort per-instance guard. Add a hosting-level rate limit before publishing.
const attempts = new Map<string, { count: number; expires: number }>()
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({error:"Please submit the form from our website."},{status:403})
  const raw = await request.text()
  if (Buffer.byteLength(raw) > 12000) return NextResponse.json({error:"Your message is too long."},{status:413})
  let input: unknown
  try { input = JSON.parse(raw) } catch { return NextResponse.json({error:"Please check your details and try again."},{status:400}) }
  const parsed = schema.safeParse(input)
  if (!parsed.success || parsed.data.website) return NextResponse.json({error:"Please check your name, school, email, phone number, and age group."},{status:400})
  const data = parsed.data
  const key = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || data.email.toLowerCase()).digest("hex")
  const now = Date.now()
  for (const [id, value] of attempts) if (value.expires <= now) attempts.delete(id)
  const previous = attempts.get(key)
  if (previous && previous.count >= 5) return NextResponse.json({error:"Please wait a few minutes before trying again, or email us directly."},{status:429})
  if (attempts.size >= 10000 && !previous) return NextResponse.json({error:"Please try again shortly or email us directly."},{status:429})
  attempts.set(key, {count: (previous?.count || 0) + 1, expires: previous?.expires || now + 10 * 60 * 1000})
  const apiKey = process.env.SCHOOL_DEMO_RESEND_API_KEY
  const from = process.env.SCHOOL_DEMO_EMAIL_FROM
  if (!apiKey || !from) return NextResponse.json({error:"Online demo requests are not available yet. Please email korakickz@gmail.com to arrange your free demo."},{status:503})
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method:"POST", headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","Idempotency-Key":`school-demo-${data.requestId}`},
      body:JSON.stringify({from,to:["korakickz@gmail.com"],reply_to:data.email,subject:"New KoraKickz school demo request",text:`Name: ${data.name}\nSchool: ${data.school}\nEmail: ${data.email}\nPhone: ${data.phone}\nAge group: ${data.ageGroup}\n\nMessage:\n${data.message || "None provided"}\n\nRequest ID: ${data.requestId}`}),
      signal:AbortSignal.timeout(15000),
    })
    const result = await response.json()
    if (!response.ok || typeof result.id !== "string") throw new Error("Email service rejected request")
    return NextResponse.json({success:true})
  } catch {
    return NextResponse.json({error:"We couldn’t confirm your request was sent. Please email korakickz@gmail.com so we can help."},{status:502})
  }
}
