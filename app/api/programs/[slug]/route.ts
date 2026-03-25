import { NextResponse } from "next/server"
import { getProgramAvailability } from "@/lib/program-service"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const availability = await getProgramAvailability(slug)
    return NextResponse.json(availability)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load program availability.",
      },
      { status: 500 }
    )
  }
}
