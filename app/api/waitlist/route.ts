import { NextResponse } from "next/server"
import { z } from "zod"
import { createOrUpdateProgramWaitlistEntry } from "@/lib/program-service"
import { getAuthenticatedUser } from "@/lib/supabase"

const waitlistSchema = z.object({
  programSlug: z.string().min(1).optional(),
  parentName: z.string().min(2),
  email: z.string().email(),
  requestedTimes: z.array(z.string().min(1)).default([]),
  requestedOptions: z
    .array(
      z.object({
        programSlug: z.string().min(1),
        label: z.string().min(1),
      })
    )
    .default([]),
}).superRefine((value, ctx) => {
  if (!value.programSlug && value.requestedOptions.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please choose a class before joining the waiting list.",
      path: ["programSlug"],
    })
  }

  if (value.programSlug && value.requestedOptions.length === 0 && value.requestedTimes.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select at least one class option.",
      path: ["requestedTimes"],
    })
  }
})

export async function POST(request: Request) {
  try {
    const body = waitlistSchema.parse(await request.json())
    const authorization = request.headers.get("authorization")
    let authenticatedUser: Awaited<ReturnType<typeof getAuthenticatedUser>> | null = null

    if (authorization?.startsWith("Bearer ")) {
      try {
        authenticatedUser = await getAuthenticatedUser(authorization.replace("Bearer ", ""))
      } catch {
        authenticatedUser = null
      }
    }

    const resolvedEmail = authenticatedUser?.email?.toLowerCase() ?? body.email.toLowerCase()

    if (body.requestedOptions.length > 0) {
      await Promise.all(
        body.requestedOptions.map((option) =>
          createOrUpdateProgramWaitlistEntry({
            programSlug: option.programSlug,
            parentName: body.parentName,
            email: resolvedEmail,
            requestedTimes: [option.label],
            userId: authenticatedUser?.id ?? null,
          })
        )
      )
    } else {
      await createOrUpdateProgramWaitlistEntry({
        programSlug: body.programSlug!,
        parentName: body.parentName,
        email: resolvedEmail,
        requestedTimes: body.requestedTimes,
        userId: authenticatedUser?.id ?? null,
      })
    }

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
