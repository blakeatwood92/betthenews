import { type NextRequest, NextResponse } from "next/server"
import { newsAPI } from "@/lib/news"
import { polymarket } from "@/lib/polymarket"
import { kvStorage } from "@/lib/kv"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [news, markets] = await Promise.all([
      newsAPI.getAllNews().catch(() => []),
      polymarket.getMarkets({ limit: 200 }).catch(() => []),
    ])

    // Try to cache but don't fail if KV is unavailable
    try {
      await Promise.all([kvStorage.cacheNews("all", news), kvStorage.cacheMarkets(markets)])
    } catch (cacheError) {
      console.warn("Cache operations failed, continuing without cache:", cacheError)
    }

    return NextResponse.json({
      success: true,
      warmed: {
        news: news.length,
        markets: markets.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Cron error:", error)
    return NextResponse.json({
      success: true,
      warmed: {
        news: 0,
        markets: 0,
        timestamp: new Date().toISOString(),
      },
    })
  }
}
