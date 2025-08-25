"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketCard } from "@/components/market-card"
import { Search, Grid, List, Zap } from "lucide-react"
import Link from "next/link"
import type { PolymarketMarket } from "@/types"

const SORT_OPTIONS = [
  { value: "volume", label: "Volume" },
  { value: "liquidity", label: "Liquidity" },
  { value: "end_date", label: "End Date" },
]

const LIQUIDITY_FILTERS = [
  { value: "all", label: "All Liquidity" },
  { value: "1000", label: "$1K+" },
  { value: "10000", label: "$10K+" },
  { value: "100000", label: "$100K+" },
]

export default function MarketsPage() {
  const [markets, setMarkets] = useState<PolymarketMarket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortBy, setSortBy] = useState("volume")
  const [liquidityFilter, setLiquidityFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [availableTags, setAvailableTags] = useState<string[]>([])

  const fetchMarkets = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: "100",
        order: sortBy,
        ascending: "false",
        ...(liquidityFilter !== "all" && { liquidity_min: liquidityFilter }),
      })

      const response = await fetch(`/api/polymarket/markets?${params}`)
      const data = await response.json()

      setMarkets(data || [])

      // Extract unique tags
      const tags = new Set<string>()
      data.forEach((market: PolymarketMarket) => {
        market.tags.forEach((tag: string) => tags.add(tag))
      })
      setAvailableTags(Array.from(tags).sort())
    } catch (error) {
      console.error("Error fetching markets:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarkets()
  }, [sortBy, liquidityFilter])

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch =
      searchQuery === "" ||
      market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag === "all" || market.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BetTheNews</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/news-to-bets" className="text-sm hover:text-primary">
                News → Bets
              </Link>
              <Link href="/guides" className="text-sm hover:text-primary">
                Guides
              </Link>
            </nav>
            <Button asChild>
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Markets</h1>
          <p className="text-muted-foreground">Explore all active prediction markets with real-time prices and data.</p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-6 space-y-4">
          {/* Search and View Toggle */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex border rounded-lg">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={liquidityFilter} onValueChange={setLiquidityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Liquidity" />
              </SelectTrigger>
              <SelectContent>
                {LIQUIDITY_FILTERS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === "all" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedTag("all")}
            >
              All
            </Badge>
            {availableTags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${filteredMarkets.length} markets found`}
          </div>
        </div>

        {/* Markets Grid/List */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredMarkets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No markets found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedTag("all")
                setLiquidityFilter("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} showDescription={viewMode === "list"} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredMarkets.length >= 100 && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={fetchMarkets}>
              Load More Markets
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
