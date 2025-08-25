import { NextResponse } from "next/server"

const GAMMA_BASE = "https://gamma-api.polymarket.com"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Validate and set defaults for query parameters
  const allowedOrders = ["liquidity", "volume", "endDate"]
  const order = searchParams.get("order") || "liquidity"
  const validOrder = allowedOrders.includes(order) ? order : "liquidity"

  const params = new URLSearchParams({
    limit: searchParams.get("limit") || "60",
    offset: searchParams.get("offset") || "0",
    order: validOrder === "endDate" ? "end_date" : validOrder,
    ascending: searchParams.get("ascending") || "false",
    active: searchParams.get("active") || "true",
    closed: searchParams.get("closed") || "false",
  })

  // Add optional filters
  if (searchParams.get("liquidity_num_min")) {
    params.set("liquidity_num_min", searchParams.get("liquidity_num_min")!)
  }
  if (searchParams.get("volume_num_min")) {
    params.set("volume_num_min", searchParams.get("volume_num_min")!)
  }
  if (searchParams.get("tag_id")) {
    params.set("tag_id", searchParams.get("tag_id")!)
  }

  try {
    console.log("[v0] Fetching from Polymarket API:", `${GAMMA_BASE}/markets?${params}`)

    const response = await fetch(`${GAMMA_BASE}/markets?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Polymarket-Live/1.0",
      },
    })

    if (!response.ok) {
      console.error("[v0] Polymarket API error:", response.status, response.statusText)
      throw new Error(`Polymarket API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Received", data?.length || 0, "markets from Polymarket API")

    // Normalize the response to match our interface
    const normalizedMarkets = (data || []).map((market: any) => ({
      id: market.id || market.condition_id || `market-${Date.now()}-${Math.random()}`,
      slug: market.slug || market.id,
      title: market.question || market.title || "Unknown Market",
      eventTitle: market.event?.title || market.eventTitle || "",
      yesPrice: market.outcomes?.[0]?.price || market.yesPrice || 0.5,
      noPrice: market.outcomes?.[1]?.price || market.noPrice || 0.5,
      liquidity: market.liquidity || market.liquidity_num || 0,
      volume: market.volume || market.volume_num || 0,
      endDate: market.end_date || market.endDate || new Date().toISOString(),
      url: `https://polymarket.com/event/${market.slug || market.id}`,
    }))

    return NextResponse.json(normalizedMarkets, {
      headers: {
        "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60",
      },
    })
  } catch (error) {
    console.error("[v0] Polymarket markets API error:", error)
    // Return empty array instead of error to prevent page crashes
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
      },
    })
  }
}
