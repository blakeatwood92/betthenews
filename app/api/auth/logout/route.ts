import { destroySession } from "@/lib/auth"

export async function POST() {
  try {
    await destroySession()
    return Response.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
