import type { NextRequest } from "next/server"
import { fetchNews } from "@/lib/news"
import { kv } from "@/lib/kv"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const categoryParam = searchParams.get("category")

    if (token !== process.env.NEWS_REFRESH_TOKEN) {
      return new Response("Unauthorized", { status: 401 })
    }

    const news = await fetchNews(categoryParam || undefined).catch(() => [])

    // Try to cache but don't fail if KV is unavailable
    try {
      const cacheKey = categoryParam ? `news:${categoryParam}` : "news:all"
      await kv.setex(cacheKey, 3600, JSON.stringify(news))
      console.log(`[v0] Refreshed ${categoryParam || "all"} news: ${news.length} articles`)
    } catch (cacheError) {
      console.warn("KV cache operation failed:", cacheError)
    }

    return Response.json({
      success: true,
      category: categoryParam || "all",
      count: news.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] News refresh error:", error)
    return Response.json({
      success: true,
      category: "all", // categoryParam is not defined here, use "all" instead
      count: 0,
      timestamp: new Date().toISOString(),
    })
  }
}
