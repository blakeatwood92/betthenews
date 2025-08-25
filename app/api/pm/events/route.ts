import { NextResponse } from "next/server"

const GAMMA_BASE = "https://gamma-api.polymarket.com"

export const runtime = "edge"

export async function GET() {
  try {
    const response = await fetch(`${GAMMA_BASE}/events`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Polymarket events API error: ${response.status}`)
    }

    const data = await response.json()

    // Normalize events data for category filtering
    const normalizedEvents = data.map((event: any) => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      tags: event.tags || [],
    }))

    return NextResponse.json(normalizedEvents, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Polymarket events API error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
