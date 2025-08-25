import type { NextRequest } from "next/server"
import { requireAuth } from "@/lib/auth"
import { updateContentPage, deleteContentPage } from "@/lib/content"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAuth()
    const input = await request.json()

    const content = await updateContentPage(params.id, input, session)

    if (!content) {
      return Response.json({ error: "Content not found" }, { status: 404 })
    }

    return Response.json({ success: true, content })
  } catch (error) {
    console.error("Update content error:", error)
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return Response.json({ error: error.message }, { status: 403 })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAuth()

    const success = await deleteContentPage(params.id, session)

    if (!success) {
      return Response.json({ error: "Content not found" }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Delete content error:", error)
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return Response.json({ error: error.message }, { status: 403 })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
