import type { NextRequest } from "next/server"
import { requireRole } from "@/lib/auth"
import { updateUser, deleteUser, checkEmailExists } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole(["admin"])

    const { name, email, role } = await request.json()

    if (!name || !email || !role) {
      return Response.json({ error: "Name, email, and role are required" }, { status: 400 })
    }

    const emailExists = await checkEmailExists(email, params.id)
    if (emailExists) {
      return Response.json({ error: "Email already exists" }, { status: 400 })
    }

    const user = await updateUser(params.id, { name, email, role })

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({ success: true, user })
  } catch (error) {
    console.error("Update user error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole(["admin"])

    const success = await deleteUser(params.id)

    if (!success) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Delete user error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
