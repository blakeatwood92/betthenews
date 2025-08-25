import type { NextRequest } from "next/server"
import { requireAuth } from "@/lib/auth"
import { createContentPage } from "@/lib/content"

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()

    if (session.role === "viewer") {
      return Response.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const input = await request.json()

    const content = await createContentPage(input, session)

    return Response.json({ success: true, content })
  } catch (error) {
    console.error("Create content error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
