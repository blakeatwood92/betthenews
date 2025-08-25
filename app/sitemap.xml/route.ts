import { NextResponse } from "next/server"
import { TOPICS } from "@/data/topics"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://betthenews.vercel.app"
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/news-to-bets", priority: "0.9", changefreq: "hourly" },
    { url: "/markets", priority: "0.9", changefreq: "hourly" },
    { url: "/guides", priority: "0.8", changefreq: "weekly" },
    { url: "/guides/what-is-a-prediction-market", priority: "0.7", changefreq: "monthly" },
    { url: "/guides/how-odds-work", priority: "0.7", changefreq: "monthly" },
    { url: "/guides/is-polymarket-legal-in-us-and-canada", priority: "0.7", changefreq: "monthly" },
    { url: "/guides/how-to-deposit-usdc-and-trade", priority: "0.7", changefreq: "monthly" },
    { url: "/guides/responsible-wagering", priority: "0.7", changefreq: "monthly" },
    { url: "/promos", priority: "0.6", changefreq: "weekly" },
    { url: "/about", priority: "0.5", changefreq: "monthly" },
    { url: "/legal", priority: "0.4", changefreq: "monthly" },
  ]

  // Topic pages
  const topicPages = TOPICS.map((topic) => ({
    url: `/topic/${topic.slug}`,
    priority: "0.8",
    changefreq: "daily",
  }))

  const allPages = [...staticPages, ...topicPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
