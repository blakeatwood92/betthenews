import type { NewsItem, PolymarketMarket, NewsMatch } from "@/types"
import { polymarket } from "./polymarket"
import { newsAPI } from "./news"

// Common stopwords to filter out
const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "can",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "his",
  "her",
  "its",
  "our",
  "their",
  "what",
  "when",
  "where",
  "why",
  "how",
  "who",
  "which",
  "than",
])

// High-value keywords that boost matching scores
const BOOST_KEYWORDS = new Set([
  "election",
  "vote",
  "poll",
  "candidate",
  "president",
  "senate",
  "house",
  "congress",
  "debate",
  "primary",
  "inflation",
  "cpi",
  "fed",
  "interest",
  "rate",
  "economy",
  "gdp",
  "unemployment",
  "recession",
  "market",
  "putin",
  "russia",
  "ukraine",
  "china",
  "taiwan",
  "war",
  "conflict",
  "sanctions",
  "nato",
  "military",
  "hurricane",
  "storm",
  "weather",
  "climate",
  "disaster",
  "flood",
  "wildfire",
  "earthquake",
  "covid",
  "pandemic",
  "vaccine",
  "health",
  "disease",
  "outbreak",
  "virus",
  "medical",
  "bitcoin",
  "crypto",
  "blockchain",
  "ethereum",
  "nft",
  "defi",
  "regulation",
  "sec",
  "supreme",
  "court",
  "judge",
  "ruling",
  "case",
  "legal",
  "lawsuit",
  "indictment",
  "trial",
  "tech",
  "ai",
  "artificial",
  "intelligence",
  "meta",
  "google",
  "apple",
  "microsoft",
  "tesla",
])

export class NewsMatchingEngine {
  private static instance: NewsMatchingEngine

  static getInstance(): NewsMatchingEngine {
    if (!NewsMatchingEngine.instance) {
      NewsMatchingEngine.instance = new NewsMatchingEngine()
    }
    return NewsMatchingEngine.instance
  }

  /**
   * Normalize text for matching - lowercase, remove punctuation, filter stopwords
   */
  private normalizeText(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word))
  }

  /**
   * Calculate similarity score between news item and market
   */
  private calculateScore(newsItem: NewsItem, market: PolymarketMarket): number {
    const newsText = `${newsItem.title} ${newsItem.contentSnippet || ""}`
    const marketText = `${market.question} ${market.title || ""} ${market.description || ""}`

    const newsTokens = new Set(this.normalizeText(newsText))
    const marketTokens = new Set(this.normalizeText(marketText))

    // Calculate keyword overlap
    let matches = 0
    let boostMatches = 0

    for (const token of newsTokens) {
      if (marketTokens.has(token)) {
        matches++
        if (BOOST_KEYWORDS.has(token)) {
          boostMatches++
        }
      }
    }

    // Base score from overlap ratio
    const overlapScore = matches / Math.max(newsTokens.size, marketTokens.size, 1)

    // Boost score for high-value keywords
    const boostScore = boostMatches * 0.2

    // Recency boost (newer news gets slight preference)
    const newsAge = Date.now() - new Date(newsItem.pubDate).getTime()
    const recencyBoost = Math.max(0, 1 - newsAge / (7 * 24 * 60 * 60 * 1000)) * 0.1 // 7 day decay

    // Liquidity boost (higher liquidity markets get preference)
    const liquidityBoost = Math.min(market.liquidity_num / 10000, 1) * 0.1

    // Tag matching boost
    let tagBoost = 0
    if (newsItem.topic && market.tags.some((tag) => tag.includes(newsItem.topic!))) {
      tagBoost = 0.15
    }

    const finalScore = overlapScore + boostScore + recencyBoost + liquidityBoost + tagBoost

    return Math.min(finalScore, 1) // Cap at 1.0
  }

  /**
   * Find matching markets for a single news item
   */
  async findMatchesForNews(newsItem: NewsItem, markets?: PolymarketMarket[]): Promise<NewsMatch["matches"]> {
    // Get markets if not provided
    if (!markets) {
      markets = await polymarket.getMarkets({
        limit: 200,
        active: true,
        closed: false,
        liquidity_min: 500,
      })
    }

    // Score all markets against this news item
    const scoredMatches = markets
      .map((market) => ({
        market,
        score: this.calculateScore(newsItem, market),
      }))
      .filter((match) => match.score > 0.1) // Only include matches with reasonable confidence
      .sort((a, b) => b.score - a.score)
      .slice(0, 3) // Top 3 matches

    return scoredMatches
  }

  /**
   * Match all news items with markets
   */
  async matchNewsWithMarkets(newsItems?: NewsItem[], markets?: PolymarketMarket[]): Promise<NewsMatch[]> {
    try {
      let news: NewsItem[] = []
      let marketData: PolymarketMarket[] = []

      // Get news data with KV error handling
      if (!newsItems) {
        try {
          news = await newsAPI.getAllNews()
        } catch (error) {
          console.error("Failed to fetch news (likely KV issue):", error)
          news = [] // Fallback to empty array
        }
      } else {
        news = newsItems
      }

      // Get market data with error handling
      if (!markets) {
        try {
          marketData = await polymarket.getMarkets({
            limit: 200,
            active: true,
            closed: false,
            liquidity_min: 500,
          })
        } catch (error) {
          console.error("Failed to fetch markets:", error)
          marketData = [] // Fallback to empty array
        }
      } else {
        marketData = markets
      }

      // If we have no data, return empty matches
      if (news.length === 0 || marketData.length === 0) {
        return []
      }

      // Match each news item
      const matches: NewsMatch[] = []

      for (const newsItem of news.slice(0, 50)) {
        // Limit to 50 news items for performance
        const itemMatches = await this.findMatchesForNews(newsItem, marketData)

        if (itemMatches.length > 0) {
          matches.push({
            news: newsItem,
            matches: itemMatches,
          })
        }
      }

      return matches.sort((a, b) => {
        // Sort by best match score, then by news recency
        const aScore = a.matches[0]?.score || 0
        const bScore = b.matches[0]?.score || 0

        if (Math.abs(aScore - bScore) > 0.1) {
          return bScore - aScore
        }

        return new Date(b.news.pubDate).getTime() - new Date(a.news.pubDate).getTime()
      })
    } catch (error) {
      console.error("Error in matchNewsWithMarkets:", error)
      // Return empty matches if data fetching fails
      return []
    }
  }

  /**
   * Search for matches based on query
   */
  async searchMatches(query: string, topic?: string): Promise<NewsMatch[]> {
    try {
      let newsItems: NewsItem[] = []

      try {
        newsItems = topic ? await newsAPI.getNewsByTopic(topic) : await newsAPI.getAllNews()
      } catch (error) {
        console.error("Failed to fetch news for search (likely KV issue):", error)
        newsItems = [] // Fallback to empty array
      }

      // If no news items, return empty matches
      if (newsItems.length === 0) {
        return []
      }

      // Filter news items that match the query
      const filteredNews = newsItems.filter((item) => {
        const searchText = `${item.title} ${item.contentSnippet || ""}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })

      return this.matchNewsWithMarkets(filteredNews)
    } catch (error) {
      console.error("Error in searchMatches:", error)
      // Return empty matches if data fetching fails
      return []
    }
  }
}

export const matchingEngine = NewsMatchingEngine.getInstance()
