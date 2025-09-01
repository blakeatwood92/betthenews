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

export const CATEGORIES = ["news", "entertainment", "politics", "sports", "tech", "economy"] as const
export type Category = (typeof CATEGORIES)[number]

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
  category: Category // Made category required instead of optional
  seoTitle?: string
  seoDescription?: string
  polymarketUrl?: string // Link to related Polymarket bet
  polymarketId?: string // Market ID for tracking
  featuredImage?: string // Featured image URL
  readingTime?: number // Estimated reading time in minutes
}

export interface PolymarketMarketNormalized {
  id: string
  slug: string
  title: string
  eventTitle: string
  yesPrice: number
  noPrice: number
  liquidity: number
  volume: number
  endDate: string
  url: string
}

export interface PolymarketEvent {
  id: string
  title: string
  slug: string
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
}

export interface BreakingItem {
  title: string
  yes?: number
  delta?: number
  href: string
  source?: string
  published?: string
}

export interface MarketFilters {
  category?: string
  search?: string
  minLiquidity?: number
  active?: boolean
  closed?: boolean
  order?: "liquidity" | "volume" | "endDate"
  ascending?: boolean
  limit?: number
  offset?: number
}
