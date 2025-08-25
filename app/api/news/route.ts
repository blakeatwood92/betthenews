import { NextResponse } from "next/server"
import { newsAPI } from "@/lib/news"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic")
  const warm = searchParams.get("warm") === "1"

  try {
    const news = topic ? await newsAPI.getNewsByTopic(topic) : await newsAPI.getAllNews()

    if (warm) {
      // For warming cache, just return success
      return NextResponse.json({ success: true, count: news.length })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json([])
  }
}
