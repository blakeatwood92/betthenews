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

    // Refresh news cache
    const news = await newsAPI.getAllNews()
    await kvStorage.cacheNews("all", news)

    // Refresh markets cache
    const markets = await polymarket.getMarkets({ limit: 200 })
    await kvStorage.cacheMarkets(markets)

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
    return NextResponse.json({ error: "Refresh failed" }, { status: 500 })
  }
}
