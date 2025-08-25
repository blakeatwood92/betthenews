import type { PolymarketMarket } from "@/types"
import { kvStorage } from "./kv"

const GAMMA_BASE = "https://gamma-api.polymarket.com"

export class PolymarketAPI {
  private static instance: PolymarketAPI

  static getInstance(): PolymarketAPI {
    if (!PolymarketAPI.instance) {
      PolymarketAPI.instance = new PolymarketAPI()
    }
    return PolymarketAPI.instance
  }

  async getMarkets(
    params: {
      limit?: number
      active?: boolean
      closed?: boolean
      order?: "volume" | "liquidity" | "end_date"
      ascending?: boolean
      liquidity_min?: number
    } = {},
  ): Promise<PolymarketMarket[]> {
    if (
      JSON.stringify(params) ===
      JSON.stringify({ limit: 100, active: true, closed: false, order: "volume", ascending: false })
    ) {
      const cached = await kvStorage.getCachedMarkets()
      if (cached) {
        return cached
      }
    }

    const searchParams = new URLSearchParams({
      limit: (params.limit ?? 100).toString(),
      active: (params.active ?? true).toString(),
      closed: (params.closed ?? false).toString(),
      order: params.order ?? "volume",
      ascending: (params.ascending ?? false).toString(),
      ...(params.liquidity_min && { liquidity_num_min: params.liquidity_min.toString() }),
    })

    const url = `${GAMMA_BASE}/markets?${searchParams}`

    try {
      const response = await fetch(url, {
        next: { revalidate: 300 }, // 5 minute cache
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status}`)
      }

      const data = await response.json()

      if (
        JSON.stringify(params) ===
        JSON.stringify({ limit: 100, active: true, closed: false, order: "volume", ascending: false })
      ) {
        await kvStorage.cacheMarkets(data)
      }

      return data as PolymarketMarket[]
    } catch (error) {
      console.error("Error fetching Polymarket markets:", error)
      return []
    }
  }

  async getMarketBySlug(slug: string): Promise<PolymarketMarket | null> {
    try {
      const response = await fetch(`${GAMMA_BASE}/markets/${slug}`, {
        next: { revalidate: 300 },
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data as PolymarketMarket
    } catch (error) {
      console.error("Error fetching market by slug:", error)
      return null
    }
  }

  async getEvents(): Promise<any[]> {
    try {
      const response = await fetch(`${GAMMA_BASE}/events`, {
        next: { revalidate: 600 }, // 10 minute cache
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Polymarket events API error: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching Polymarket events:", error)
      return []
    }
  }
}

export const polymarket = PolymarketAPI.getInstance()
