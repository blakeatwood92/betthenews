import { NextResponse } from "next/server"
import { matchingEngine } from "@/lib/matching"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic")
  const query = searchParams.get("q")
  const limit = Number.parseInt(searchParams.get("limit") ?? "20")

  try {
    let matches

    if (query) {
      // Search-based matching
      matches = await matchingEngine.searchMatches(query, topic || undefined)
    } else {
      // General matching
      matches = await matchingEngine.matchNewsWithMarkets()
    }

    // Limit results
    const limitedMatches = matches.slice(0, limit)

    return NextResponse.json({
      matches: limitedMatches,
      total: matches.length,
      query,
      topic,
    })
  } catch (error) {
    console.error("Match API error:", error)
    return NextResponse.json({ error: "Failed to match news with markets" }, { status: 500 })
  }
}
