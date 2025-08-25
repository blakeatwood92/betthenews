import { NextResponse } from "next/server"
import { polymarket } from "@/lib/polymarket"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const params = {
    limit: Number.parseInt(searchParams.get("limit") ?? "100"),
    active: searchParams.get("active") !== "false",
    closed: searchParams.get("closed") === "true",
    order: (searchParams.get("order") as "volume" | "liquidity" | "end_date") ?? "volume",
    ascending: searchParams.get("ascending") === "true",
    liquidity_min: searchParams.get("liquidity_min") ? Number.parseInt(searchParams.get("liquidity_min")!) : 500,
  }

  try {
    const markets = await polymarket.getMarkets(params)
    return NextResponse.json(markets)
  } catch (error) {
    console.error("Markets API error:", error)
    return NextResponse.json({ error: "Failed to fetch markets" }, { status: 500 })
  }
}
