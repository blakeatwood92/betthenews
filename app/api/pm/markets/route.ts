import { NextResponse } from "next/server"

export const runtime = "edge"

const STATIC_MARKETS = [
  {
    id: "will-trump-win-2024",
    slug: "will-trump-win-2024",
    title: "Will Donald Trump win the 2024 US Presidential Election?",
    eventTitle: "2024 US Presidential Election",
    yesPrice: 0.52,
    noPrice: 0.48,
    liquidity: 2500000,
    volume: 15000000,
    endDate: "2024-11-05T23:59:59Z",
    url: "https://polymarket.com/event/will-trump-win-2024",
  },
  {
    id: "bitcoin-100k-2024",
    slug: "bitcoin-100k-2024",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    eventTitle: "Bitcoin Price Predictions",
    yesPrice: 0.35,
    noPrice: 0.65,
    liquidity: 1800000,
    volume: 8500000,
    endDate: "2024-12-31T23:59:59Z",
    url: "https://polymarket.com/event/bitcoin-100k-2024",
  },
  {
    id: "ai-agi-2025",
    slug: "ai-agi-2025",
    title: "Will AGI be achieved by a major AI lab in 2025?",
    eventTitle: "Artificial General Intelligence",
    yesPrice: 0.15,
    noPrice: 0.85,
    liquidity: 950000,
    volume: 3200000,
    endDate: "2025-12-31T23:59:59Z",
    url: "https://polymarket.com/event/ai-agi-2025",
  },
  {
    id: "fed-rate-cut-2024",
    slug: "fed-rate-cut-2024",
    title: "Will the Fed cut interest rates in Q4 2024?",
    eventTitle: "Federal Reserve Policy",
    yesPrice: 0.78,
    noPrice: 0.22,
    liquidity: 1200000,
    volume: 4800000,
    endDate: "2024-12-31T23:59:59Z",
    url: "https://polymarket.com/event/fed-rate-cut-2024",
  },
  {
    id: "spacex-mars-2026",
    slug: "spacex-mars-2026",
    title: "Will SpaceX successfully land humans on Mars by 2026?",
    eventTitle: "Space Exploration",
    yesPrice: 0.08,
    noPrice: 0.92,
    liquidity: 750000,
    volume: 2100000,
    endDate: "2026-12-31T23:59:59Z",
    url: "https://polymarket.com/event/spacex-mars-2026",
  },
  {
    id: "climate-target-2024",
    slug: "climate-target-2024",
    title: "Will global CO2 emissions decrease in 2024?",
    eventTitle: "Climate Change",
    yesPrice: 0.42,
    noPrice: 0.58,
    liquidity: 680000,
    volume: 1900000,
    endDate: "2024-12-31T23:59:59Z",
    url: "https://polymarket.com/event/climate-target-2024",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const markets = [...STATIC_MARKETS]

  const limit = Math.min(Number.parseInt(searchParams.get("limit") || "12"), 100)
  const offset = Math.max(Number.parseInt(searchParams.get("offset") || "0"), 0)
  const order = searchParams.get("order") || "liquidity"

  // Sort markets based on order parameter
  if (order === "volume") {
    markets.sort((a, b) => b.volume - a.volume)
  } else if (order === "endDate") {
    markets.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
  } else {
    markets.sort((a, b) => b.liquidity - a.liquidity)
  }

  // Apply pagination
  const paginatedMarkets = markets.slice(offset, offset + limit)

  return NextResponse.json(paginatedMarkets, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  })
}
