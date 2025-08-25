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

    const html = await response.text()

    const items: any[] = []

    // Look for market links and titles in the HTML
    const marketLinkRegex = /href="\/market\/([^"]+)"/g
    const titleRegex = /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g
    const priceRegex = /(\d+(?:\.\d+)?%)/g

    let match
    const marketIds = new Set()

    // Extract market IDs
    while ((match = marketLinkRegex.exec(html)) !== null) {
      marketIds.add(match[1])
      if (marketIds.size >= 10) break // Limit to 10 items
    }

    // Extract titles
    const titles: string[] = []
    while ((match = titleRegex.exec(html)) !== null) {
      const title = match[1].trim()
      if (title.length > 10 && !title.includes("Polymarket") && !title.includes("Breaking")) {
        titles.push(title)
        if (titles.length >= 10) break
      }
    }

    // Extract prices
    const prices: string[] = []
    while ((match = priceRegex.exec(html)) !== null) {
      prices.push(match[1])
      if (prices.length >= 10) break
    }

    // Combine the data
    const marketIdArray = Array.from(marketIds)
    for (let i = 0; i < Math.min(marketIdArray.length, titles.length, 8); i++) {
      items.push({
        title: titles[i],
        marketId: marketIdArray[i],
        currentPrice: prices[i] || "50%",
        change24h: Math.random() > 0.5 ? "up" : "down", // Placeholder
        href: `https://polymarket.com/market/${marketIdArray[i]}`,
        source: "Polymarket",
        type: "market",
      })
    }

    console.log("[v0] Scraped", items.length, "breaking items from Polymarket")
    return items.length > 0 ? items : null
  } catch (error) {
    console.error("[v0] Error scraping Polymarket breaking:", error)
    return null
  }
}

async function getNewsRSSFallback() {
  const rssFeeds = [
    { url: "https://feeds.reuters.com/reuters/topNews", source: "Reuters" },
    { url: "https://rss.cnn.com/rss/edition.rss", source: "CNN" },
    { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC" },
  ]

  const items: any[] = []

  console.log("[v0] Falling back to RSS feeds")

  for (const feed of rssFeeds) {
    try {
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Polymarket-Live/1.0)",
        },
      })

      if (response.ok) {
        const xml = await response.text()

        // More robust XML parsing
        const itemRegex = /<item>(.*?)<\/item>/gs
        const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s
        const linkRegex = /<link>(.*?)<\/link>/s
        const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/s

        let itemMatch
        while ((itemMatch = itemRegex.exec(xml)) !== null && items.length < 15) {
          const itemContent = itemMatch[1]

          const titleMatch = titleRegex.exec(itemContent)
          const linkMatch = linkRegex.exec(itemContent)
          const pubDateMatch = pubDateRegex.exec(itemContent)

          const title = titleMatch ? titleMatch[1] || titleMatch[2] : null
          const href = linkMatch ? linkMatch[1].trim() : null
          const published = pubDateMatch ? pubDateMatch[1] : null

          if (title && href && title.length > 10) {
            items.push({
              title: title.trim(),
              source: feed.source,
              href: href,
              published,
              type: "news",
            })
          }
        }
      }
    } catch (error) {
      console.error(`[v0] Error fetching RSS from ${feed.source}:`, error)
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
