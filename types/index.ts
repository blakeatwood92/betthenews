export interface PolymarketMarket {
  id: string
  slug: string
  question: string
  title?: string
  description?: string
  tags: string[]
  active: boolean
  closed: boolean
  end_date_iso: string
  liquidity_num: number
  volume_num: number
  outcomes: {
    price: number
    name: string
  }[]
  ancillary_url?: string
}

export interface NewsItem {
  id: string
  title: string
  link: string
  pubDate?: string
  source?: string
  topic: string
}

export interface NewsMatch {
  news: NewsItem
  matches: {
    market: PolymarketMarket
    score: number
  }[]
}

export interface Topic {
  slug: string
  title: string
  category: Category
  queries: string[]
}

export const CATEGORIES = ["world", "tech", "economy", "sports", "politics"] as const
export type Category = (typeof CATEGORIES)[number]

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
  createdAt: Date
}

export interface Session {
  userId: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
}

export interface ContentPage {
  id: string
  slug: string
  title: string
  content: string
  excerpt?: string
  status: "draft" | "published" | "archived"
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  tags: string[]
  category?: Category
  seoTitle?: string
  seoDescription?: string
}

export interface ContentPageInput {
  title: string
  content: string
  excerpt?: string
  status: "draft" | "published"
  tags: string[]
  category?: Category
  seoTitle?: string
  seoDescription?: string
}
