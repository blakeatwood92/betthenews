"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NewsMatchCard } from "@/components/news-match-card"
import { Search, RefreshCw, Zap } from "lucide-react"
import Link from "next/link"
import type { NewsMatch } from "@/types"

const TOPICS = [
  { slug: "all", label: "All" },
  { slug: "politics", label: "Politics" },
  { slug: "economy", label: "Economy" },
  { slug: "world", label: "World" },
  { slug: "tech", label: "Tech" },
  { slug: "sports", label: "Sports" },
]

export default function NewsToBetsPage() {
  const [matches, setMatches] = useState<NewsMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchMatches = async (topic?: string, query?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (topic && topic !== "all") params.set("topic", topic)
      if (query) params.set("q", query)
      params.set("limit", "30")

      const response = await fetch(`/api/match?${params}`)
      const data = await response.json()

      setMatches(data.matches || [])
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching matches:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches(selectedTopic, searchQuery)
  }, [selectedTopic])

  const handleSearch = () => {
    fetchMatches(selectedTopic, searchQuery)
  }

  const handleRefresh = () => {
    fetchMatches(selectedTopic, searchQuery)
  }

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
              <Link href="/markets" className="text-sm hover:text-primary">
                Markets
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
          <h1 className="text-3xl font-bold mb-2">News → Bets</h1>
          <p className="text-muted-foreground">
            Real-time matching of breaking news with prediction markets. Updated every 60 seconds.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news and markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              Search
            </Button>
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {/* Topic Filters */}
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <Badge
                key={topic.slug}
                variant={selectedTopic === topic.slug ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedTopic(topic.slug)}
              >
                {topic.label}
              </Badge>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{loading ? "Loading..." : `${matches.length} matches found`}</span>
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or topic filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTopic("all")
                  fetchMatches()
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {matches.map((match, index) => (
                <NewsMatchCard key={`${match.news.link}-${index}`} match={match} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {matches.length >= 30 && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => fetchMatches(selectedTopic, searchQuery)}>
              Load More Matches
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
