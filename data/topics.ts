import type { Category } from "@/types"

export type Topic = {
  slug: string
  title: string
  category: Category
  queries: string[]
}

export const TOPICS: Topic[] = [
  {
    slug: "putin-visit",
    title: "Putin's Visit",
    category: "news", // Updated from "world" to "news"
    queries: ["putin visit", "kremlin visit", "putin summit", "north korea putin"],
  },

  {
    slug: "ai-safety",
    title: "AI Safety & Policy",
    category: "tech",
    queries: ["ai regulation us", "openai safety board", "eu ai act"],
  },

  {
    slug: "inflation-cpi",
    title: "Inflation & CPI",
    category: "economy",
    queries: ["CPI inflation", "consumer price index", "fed rates decision"],
  },

  { slug: "nfl", title: "NFL", category: "sports", queries: ["NFL odds", "NFL betting lines", "NFL injuries"] },

  {
    slug: "epstein-files",
    title: "Epstein Files",
    category: "politics",
    queries: ["epstein files", "jeffrey epstein documents", "epstein client list"],
  },

  {
    slug: "celebrity-news",
    title: "Celebrity News",
    category: "entertainment",
    queries: ["celebrity scandal", "hollywood news", "entertainment awards"],
  },

  {
    slug: "streaming-wars",
    title: "Streaming Wars",
    category: "entertainment",
    queries: ["netflix vs disney", "streaming subscriber", "content wars"],
  },
]

export const TOPIC_MAP = TOPICS.reduce(
  (acc, topic) => {
    acc[topic.slug] = topic
    return acc
  },
  {} as Record<string, Topic>,
)

export default TOPICS
