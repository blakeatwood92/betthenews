import { type NextRequest, NextResponse } from "next/server"
import { newsAPI } from "@/lib/news"
import { polymarket } from "@/lib/polymarket"
import { kvStorage } from "@/lib/kv"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (token !== process.env.NEWS_REFRESH_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const news = await newsAPI.getAllNews()
    const markets = await polymarket.getMarkets({ limit: 200 })

    // Try to cache but don't fail if KV is unavailable
    try {
      await kvStorage.cacheNews("all", news)
      await kvStorage.cacheMarkets(markets)
    } catch (cacheError) {
      console.warn("Cache operation failed, continuing without cache:", cacheError)
    }

    return NextResponse.json({
      success: true,
      refreshed: {
        news: news.length,
        markets: markets.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Refresh error:", error)
    return NextResponse.json({
      success: true,
      refreshed: {
        news: 0,
        markets: 0,
        timestamp: new Date().toISOString(),
      },
    })
  }
}
