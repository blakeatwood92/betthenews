import type { NextRequest } from "next/server"
import { requireRole } from "@/lib/auth"
import { createUser, checkEmailExists } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await requireRole(["admin"])

    const { name, email, password, role } = await request.json()

    if (!name || !email || !password || !role) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return Response.json({ error: "Email already exists" }, { status: 400 })
    }

    const user = await createUser(email, password, name, role)

    return Response.json({ success: true, user })
  } catch (error) {
    console.error("Create user error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
