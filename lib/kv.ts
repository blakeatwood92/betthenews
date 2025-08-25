let kvAvailable = false
let kv: any = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv: vercelKv } = await import("@vercel/kv")
    kv = vercelKv
    kvAvailable = true
  }
} catch (error) {
  console.warn("KV storage not available:", error)
}

export class KVStorage {
  private static instance: KVStorage

  static getInstance(): KVStorage {
    if (!KVStorage.instance) {
      KVStorage.instance = new KVStorage()
    }
    return KVStorage.instance
  }

  /**
   * Store click analytics data
   */
  async trackClick(clickId: string, data: any): Promise<void> {
    if (!kvAvailable) {
      console.log("[v0] KV not available, skipping click tracking")
      return
    }

    try {
      await kv.set(`click:${clickId}`, data, { ex: 60 * 60 * 24 * 30 }) // 30 days

      // Increment daily counter
      const today = new Date().toISOString().split("T")[0]
      await kv.incr(`clicks:daily:${today}`)

      // Increment campaign counter
      await kv.incr(`clicks:campaign:${data.campaign}`)
    } catch (error) {
      console.error("KV click tracking error:", error)
    }
  }

  /**
   * Get click statistics
   */
  async getClickStats(days = 7): Promise<any> {
    if (!kvAvailable) {
      return { daily: {}, campaigns: {} }
    }

    try {
      const stats: any = { daily: {}, campaigns: {} }

      // Get daily stats for last N days
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split("T")[0]
        const count = (await kv.get(`clicks:daily:${dateStr}`)) || 0
        stats.daily[dateStr] = count
      }

      return stats
    } catch (error) {
      console.error("KV stats error:", error)
      return { daily: {}, campaigns: {} }
    }
  }

  /**
   * Cache news data
   */
  async cacheNews(topic: string, data: any): Promise<void> {
    if (!kvAvailable) {
      return
    }

    try {
      await kv.set(`news:${topic}`, data, { ex: 60 * 5 }) // 5 minutes
    } catch (error) {
      console.error("KV news cache error:", error)
    }
  }

  /**
   * Get cached news data
   */
  async getCachedNews(topic: string): Promise<any> {
    if (!kvAvailable) {
      return null
    }

    try {
      return await kv.get(`news:${topic}`)
    } catch (error) {
      console.error("KV news cache get error:", error)
      return null
    }
  }

  /**
   * Cache market data
   */
  async cacheMarkets(data: any): Promise<void> {
    if (!kvAvailable) {
      return
    }

    try {
      await kv.set("markets:all", data, { ex: 60 * 5 }) // 5 minutes
    } catch (error) {
      console.error("KV markets cache error:", error)
    }
  }

  /**
   * Get cached market data
   */
  async getCachedMarkets(): Promise<any> {
    if (!kvAvailable) {
      return null
    }

    try {
      return await kv.get("markets:all")
    } catch (error) {
      console.error("KV markets cache get error:", error)
      return null
    }
  }
}

export const kvStorage = KVStorage.getInstance()

export { kv }
