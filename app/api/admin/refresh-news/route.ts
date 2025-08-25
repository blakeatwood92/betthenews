import type { NextRequest } from "next/server"
import { fetchNews } from "@/lib/news"
import { kv } from "@/lib/kv"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const category = searchParams.get("category")

    if (token !== process.env.NEWS_REFRESH_TOKEN) {
      return new Response("Unauthorized", { status: 401 })
    }

    const cacheKey = category ? `news:${category}` : "news:all"
    const news = await fetchNews(category || undefined)

    await kv.setex(cacheKey, 3600, JSON.stringify(news))

    console.log(`[v0] Refreshed ${category || "all"} news: ${news.length} articles`)

    return Response.json({
      success: true,
      category: category || "all",
      count: news.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] News refresh error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to refresh news",
      },
      { status: 500 },
    )
  }
}
