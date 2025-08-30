import { NextResponse } from "next/server"

const GAMMA_BASE = "https://gamma-api.polymarket.com"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Validate and set defaults for query parameters
  const allowedOrders = ["liquidity", "volume", "endDate"]
  const order = searchParams.get("order") || "liquidity"
  const validOrder = allowedOrders.includes(order) ? order : "liquidity"

  const sanitizeNumber = (value: string | null, defaultValue: string, max?: number) => {
    if (!value) return defaultValue
    const num = Number.parseFloat(value)
    if (isNaN(num) || num < 0) return defaultValue
    const sanitized = Math.floor(num)
    return max && sanitized > max ? max.toString() : sanitized.toString()
  }

  const params = new URLSearchParams({
    limit: sanitizeNumber(searchParams.get("limit"), "60", 100),
    offset: sanitizeNumber(searchParams.get("offset"), "0", 10000),
    order: validOrder === "endDate" ? "end_date" : validOrder,
    ascending: searchParams.get("ascending") === "true" ? "true" : "false",
    active: searchParams.get("active") === "false" ? "false" : "true",
    closed: searchParams.get("closed") === "true" ? "true" : "false",
  })

  const liquidityMin = searchParams.get("liquidity_num_min")
  if (liquidityMin && !isNaN(Number.parseFloat(liquidityMin)) && Number.parseFloat(liquidityMin) >= 0) {
    params.set("liquidity_num_min", sanitizeNumber(liquidityMin, "0", 1000000))
  }

  const volumeMin = searchParams.get("volume_num_min")
  if (volumeMin && !isNaN(Number.parseFloat(volumeMin)) && Number.parseFloat(volumeMin) >= 0) {
    params.set("volume_num_min", sanitizeNumber(volumeMin, "0", 1000000))
  }

  const tagId = searchParams.get("tag_id")
  if (tagId && /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,49}$/.test(tagId)) {
    params.set("tag_id", tagId)
  }

  try {
    const apiUrl = `${GAMMA_BASE}/markets?${params.toString()}`
    console.log("[v0] Fetching from Polymarket API:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "PolymarketLive/1.0",
      },
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.error("[v0] Polymarket API error:", response.status, response.statusText, errorText)
      throw new Error(`Polymarket API error: ${response.status} - ${errorText}`)
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
