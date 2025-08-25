import Parser from "rss-parser"
import { TOPICS } from "@/data/topics"
import type { Category } from "@/types"

const parser = new Parser()
const TTL = 60 * 60 // 1 hour

let kv: any = null
let kvAvailable = false

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv: kvClient } = require("@vercel/kv")
    kv = kvClient
    kvAvailable = true
  }
} catch (error) {
  console.log("KV not available, using fallback mode")
}

export type NewsItem = {
  id: string
  title: string
  link: string
  pubDate?: string
  source?: string
  topic: string
}

const GOOGLE_NEWS = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`

const KEY_TOPIC = (slug: string) => `news:${slug}`
const KEY_CAT = (cat: Category) => `news:cat:${cat}`

export async function fetchNewsForTopic(topic: { slug: string; queries: string[] }): Promise<NewsItem[]> {
  const items: NewsItem[] = []

  try {
    for (const q of topic.queries) {
      const xml = await fetch(GOOGLE_NEWS(q), { cache: "no-store" }).then((r) => r.text())
      const feed = await parser.parseString(xml)
      for (const it of feed.items ?? []) {
        items.push({
          id: `${topic.slug}:${it.link}`,
          title: it.title || "",
          link: it.link || "",
          pubDate: it.pubDate,
          source: (it as any).source?.title ?? it.creator ?? undefined,
          topic: topic.slug,
        })
      }
    }
  } catch (error) {
    console.log(`Failed to fetch news for topic ${topic.slug}:`, error)
    return []
  }

  const seen = new Set<string>()
  return items.filter((x) => {
    if (!x.link || seen.has(x.link)) return false
    seen.add(x.link)
    return true
  })
}

export async function refreshTopicInKV(topic: { slug: string; queries: string[] }) {
  const data = await fetchNewsForTopic(topic)
  const trimmed = data
    .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
    .slice(0, 40)

  if (kvAvailable && kv) {
    try {
      await kv.set(KEY_TOPIC(topic.slug), trimmed, { ex: TTL })
    } catch (error) {
      console.log(`Failed to cache topic ${topic.slug} in KV:`, error)
    }
  }

  return trimmed
}

export async function getTopicFromKV(slug: string): Promise<NewsItem[]> {
  if (!kvAvailable || !kv) {
    return []
  }

  try {
    return (await kv.get<NewsItem[]>(KEY_TOPIC(slug))) || []
  } catch (error) {
    console.log(`Failed to get topic ${slug} from KV:`, error)
    return []
  }
}

export async function refreshCategoryInKV(cat: Category) {
  const inCat = TOPICS.filter((t) => t.category === cat)

  if (!kvAvailable || !kv) {
    // Fallback: fetch fresh data for all topics in category
    const lists = await Promise.all(inCat.map(fetchNewsForTopic))
    return lists
      .flat()
      .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
      .slice(0, 60)
  }

  try {
    const lists = await Promise.all(inCat.map((t) => kv.get<NewsItem[]>(KEY_TOPIC(t.slug)) || Promise.resolve([])))
    const merged = lists
      .flat()
      .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
      .slice(0, 60)

    await kv.set(KEY_CAT(cat), merged, { ex: TTL })
    return merged
  } catch (error) {
    console.log(`Failed to refresh category ${cat} in KV:`, error)
    // Fallback to fresh data
    const lists = await Promise.all(inCat.map(fetchNewsForTopic))
    return lists
      .flat()
      .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
      .slice(0, 60)
  }
}

export async function getCategoryFromKV(cat: Category): Promise<NewsItem[]> {
  if (!kvAvailable || !kv) {
    return []
  }

  try {
    return (await kv.get<NewsItem[]>(KEY_CAT(cat))) || []
  } catch (error) {
    console.log(`Failed to get category ${cat} from KV:`, error)
    return []
  }
}
