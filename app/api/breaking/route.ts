import { NextResponse } from "next/server"

export const runtime = "edge"

async function getSafeBreakingNews() {
  try {
    console.log("[v0] Generating safe breaking news content")

    // Safe mock data that doesn't require scraping
    const mockBreakingItems = [
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
        title: "Sports Championship Odds Update",
        currentPrice: "73%",
        change24h: "up",
        href: "https://polymarket.com/event/championship",
        source: "Polymarket",
        type: "market",
      },
    ]

    return mockBreakingItems
  } catch (error) {
    console.error("[v0] Error generating breaking news:", error)
    return []
  }
}

async function getSingleRSSFeed() {
  try {
    console.log("[v0] Fetching single RSS feed")

    const response = await fetch("https://feeds.reuters.com/reuters/topNews", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsReader/1.0)",
      },
    })

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`)
    }

    const xml = await response.text()
    const items: any[] = []

    // Simple XML parsing for titles and links
    const itemRegex = /<item>(.*?)<\/item>/gs
    const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s
    const linkRegex = /<link>(.*?)<\/link>/s

    let itemMatch
    let count = 0
    while ((itemMatch = itemRegex.exec(xml)) !== null && count < 5) {
      const itemContent = itemMatch[1]
      const titleMatch = titleRegex.exec(itemContent)
      const linkMatch = linkRegex.exec(itemContent)

      const title = titleMatch ? titleMatch[1] || titleMatch[2] : null
      const href = linkMatch ? linkMatch[1].trim() : null

      if (title && href && title.length > 15) {
        items.push({
          title: title.trim(),
          source: "Reuters",
          href: href,
          type: "news",
        })
        count++
      }
    }

    console.log("[v0] Retrieved", items.length, "RSS items")
    return items
  } catch (error) {
    console.error("[v0] RSS fetch error:", error)
    return []
  }
}

export async function GET() {
  try {
    let breakingItems = await getSafeBreakingNews()

    // Add a few RSS items if available
    const rssItems = await getSingleRSSFeed()
    breakingItems = [...breakingItems, ...rssItems.slice(0, 3)]

    return NextResponse.json(breakingItems, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Longer cache to reduce requests
      },
    })
  } catch (error) {
    console.error("[v0] Breaking API error:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  }
}
