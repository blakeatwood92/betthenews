import { NextResponse } from "next/server"

export const runtime = "edge"

async function getSafeBreakingNews() {
  console.log("[v0] Generating safe breaking news content")

  const staticBreakingItems = [
    {
      title: "Presidential Election Odds Shift Following Latest Polls",
      currentPrice: "52%",
      change24h: "up",
      href: "https://polymarket.com/event/presidential-election-2024",
      source: "Polymarket",
      type: "market",
    },
    {
      title: "Federal Reserve Rate Decision Market Moves",
      currentPrice: "68%",
      change24h: "down",
      href: "https://polymarket.com/event/fed-rate-decision",
      source: "Polymarket",
      type: "market",
    },
    {
      title: "Tech Stock Volatility Creates New Betting Opportunities",
      currentPrice: "45%",
      change24h: "up",
      href: "https://polymarket.com/event/tech-stocks",
      source: "Polymarket",
      type: "market",
    },
    {
      title: "Sports Championship Odds Update After Major Trade",
      currentPrice: "73%",
      change24h: "up",
      href: "https://polymarket.com/event/championship",
      source: "Polymarket",
      type: "market",
    },
    {
      title: "Breaking: Major Economic Policy Announcement Expected",
      source: "Financial News",
      href: "#",
      type: "news",
    },
    {
      title: "Technology Sector Sees Significant Market Movement",
      source: "Tech News",
      href: "#",
      type: "news",
    },
    {
      title: "International Trade Relations Update Impacts Markets",
      source: "Global News",
      href: "#",
      type: "news",
    },
  ]

  return staticBreakingItems
}

export async function GET() {
  try {
    const breakingItems = await getSafeBreakingNews()

    return NextResponse.json(breakingItems, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200", // Much longer cache
      },
    })
  } catch (error) {
    console.error("[v0] Breaking API error:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  }
}
