import { NextResponse } from "next/server"
import { z } from "zod"
import { createOrUpdateProgramWaitlistEntry } from "@/lib/program-service"

const waitlistSchema = z.object({
  programSlug: z.string().min(1),
  parentName: z.string().min(2),
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    const body = waitlistSchema.parse(await request.json())
    await createOrUpdateProgramWaitlistEntry(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to join the waiting list.",
      },
      { status: 400 }
    )
  }
}
