import { refreshTopicInKV, getTopicFromKV, refreshCategoryInKV, getCategoryFromKV } from "./fetch-news-for-topic"
import type { NewsItem, Category } from "@/types"
import { TOPICS } from "@/data/topics"

export class NewsAPI {
  private static instance: NewsAPI

  static getInstance(): NewsAPI {
    if (!NewsAPI.instance) {
      NewsAPI.instance = new NewsAPI()
    }
    return NewsAPI.instance
  }

  async getNewsByTopic(topicSlug: string): Promise<NewsItem[]> {
    // Try to get from KV cache first
    const cached = await getTopicFromKV(topicSlug)
    if (cached.length > 0) {
      return cached
    }

    // If not cached, fetch and cache
    const topic = TOPICS.find((t) => t.slug === topicSlug)
    if (!topic) return []

    return await refreshTopicInKV(topic)
  }

  async getNewsByCategory(category: Category): Promise<NewsItem[]> {
    // Try to get from KV cache first
    const cached = await getCategoryFromKV(category)
    if (cached.length > 0) {
      return cached
    }

    // If not cached, refresh category cache
    return await refreshCategoryInKV(category)
  }

  async getAllNews(): Promise<NewsItem[]> {
    const allItems: NewsItem[] = []

    for (const topic of TOPICS) {
      const items = await this.getNewsByTopic(topic.slug)
      allItems.push(...items)
    }

    // Remove duplicates and sort by date
    const uniqueItems = allItems.filter((item, index, self) => index === self.findIndex((t) => t.link === item.link))

    return uniqueItems
      .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime())
      .slice(0, 200)
  }

  async refreshTopic(topicSlug: string): Promise<NewsItem[]> {
    const topic = TOPICS.find((t) => t.slug === topicSlug)
    if (!topic) return []

    return await refreshTopicInKV(topic)
  }

  async refreshCategory(category: Category): Promise<NewsItem[]> {
    return await refreshCategoryInKV(category)
  }
}

export const newsAPI = NewsAPI.getInstance()

export async function fetchNews(category?: string): Promise<NewsItem[]> {
  if (category) {
    return newsAPI.getNewsByTopic(category)
  }
  return newsAPI.getAllNews()
}
