import { NextResponse } from "next/server"
import { TOPICS } from "@/data/topics"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://polymarketbonus.com"
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/markets", priority: "0.9", changefreq: "hourly" },
    { url: "/breaking", priority: "0.9", changefreq: "hourly" },
    { url: "/content", priority: "0.8", changefreq: "daily" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/privacy", priority: "0.5", changefreq: "monthly" },
    { url: "/terms", priority: "0.5", changefreq: "monthly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
  ]

  const contentCategories = ["news", "politics", "sports", "entertainment", "tech", "economy"]
  const categoryPages = contentCategories.map((category) => ({
    url: `/content/${category}`,
    priority: "0.7",
    changefreq: "daily",
  }))

  // Topic pages
  const topicPages = TOPICS.map((topic) => ({
    url: `/topic/${topic.slug}`,
    priority: "0.8",
    changefreq: "daily",
  }))

  const allPages = [...staticPages, ...categoryPages, ...topicPages]

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
