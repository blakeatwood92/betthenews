import { NextResponse } from "next/server"

export const runtime = "edge"

async function scrapePolymarketBreaking() {
  try {
    console.log("[v0] Attempting to scrape Polymarket breaking page")

    const response = await fetch("https://polymarket.com/breaking", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Polymarket-Live/1.0)",
      },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch breaking page:", response.status)
      throw new Error(`Failed to fetch breaking page: ${response.status}`)
    }

    // For now, return empty array since scraping is complex
    // In production, you'd use a proper HTML parser here
    console.log("[v0] Breaking page fetched, but scraping not implemented")
    return []
  } catch (error) {
    console.error("[v0] Error scraping Polymarket breaking:", error)
    return null
  }
}

async function getNewsRSSFallback() {
  const topics = ["US election", "AI", "BRICS", "interest rates", "crypto"]
  const items: any[] = []

  console.log("[v0] Falling back to RSS feeds")

  for (const topic of topics.slice(0, 3)) {
    try {
      const response = await fetch(
        `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-US&gl=US&ceid=US:en`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Polymarket-Live/1.0)",
          },
        },
      )

      if (response.ok) {
        const xml = await response.text()
        // Simple XML parsing for RSS
        const titleMatches = xml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g)
        const linkMatches = xml.match(/<link>(.*?)<\/link>/g)
        const pubDateMatches = xml.match(/<pubDate>(.*?)<\/pubDate>/g)

        if (titleMatches && linkMatches) {
          for (let i = 1; i < Math.min(titleMatches.length, 3); i++) {
            const title = titleMatches[i].replace(/<title><!\[CDATA\[/, "").replace(/\]\]><\/title>/, "")
            const href = linkMatches[i]?.replace(/<link>/, "").replace(/<\/link>/, "")
            const published = pubDateMatches?.[i]?.replace(/<pubDate>/, "").replace(/<\/pubDate>/, "")

            if (title && href) {
              items.push({
                title,
                source: "Google News",
                href,
                published,
              })
            }
          }
        }
      }
    } catch (error) {
      console.error(`[v0] Error fetching RSS for ${topic}:`, error)
    }
  }

  console.log("[v0] Retrieved", items.length, "RSS items")
  return items
}

export async function GET() {
  try {
    // Try scraping Polymarket breaking first
    let breakingItems = await scrapePolymarketBreaking()

    // If scraping fails, fall back to RSS
    if (!breakingItems || breakingItems.length === 0) {
      console.log("[v0] Polymarket scraping failed, falling back to RSS")
      breakingItems = await getNewsRSSFallback()
    }

    return NextResponse.json(breakingItems || [], {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  } catch (error) {
    console.error("[v0] Breaking API error:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
      },
    })
  }
}
