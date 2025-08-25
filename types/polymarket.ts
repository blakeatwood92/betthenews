export interface PolymarketMarket {
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
  outcomes?: Array<{
    price: number
    name: string
  }>
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
