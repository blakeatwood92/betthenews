import Parser from "rss-parser"
import { kv } from "@vercel/kv"
import { TOPICS } from "@/data/topics"
import type { Category } from "@/types"

const parser = new Parser()
const TTL = 60 * 60 // 1 hour

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
  await kv.set(KEY_TOPIC(topic.slug), trimmed, { ex: TTL })
  return trimmed
}

export async function getTopicFromKV(slug: string) {
  return (await kv.get<NewsItem[]>(KEY_TOPIC(slug))) || []
}

export async function refreshCategoryInKV(cat: Category) {
  const inCat = TOPICS.filter((t) => t.category === cat)
  const lists = await Promise.all(inCat.map((t) => kv.get<NewsItem[]>(KEY_TOPIC(t.slug)) || Promise.resolve([])))
  const merged = lists
    .flat()
    .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
    .slice(0, 60)
  await kv.set(KEY_CAT(cat), merged, { ex: TTL })
  return merged
}

export async function getCategoryFromKV(cat: Category) {
  return (await kv.get<NewsItem[]>(KEY_CAT(cat))) || []
}
