"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface NewsMatch {
  id: string
  headline: string
  market: {
    question: string
    price: number
    slug: string
  }
  score: number
  topic: string
}

export function LiveNewsRail() {
  const [matches, setMatches] = useState<NewsMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/match?limit=3")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setMatches(data.matches || [])
      } catch (err) {
        setError("Failed to load news matches")
        console.error("Error fetching matches:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
    // Refresh every 5 minutes
    const interval = setInterval(fetchMatches, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-muted-foreground">Loading live matches...</span>
      </div>
    )
  }

  if (error || matches.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Live news matching will appear here. Visit the News → Bets page to see real-time matches.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {matches.map((match) => (
        <Card key={match.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="secondary" className="text-xs">
                {match.topic}
              </Badge>
              <span className="text-xs text-muted-foreground">{Math.round(match.score * 100)}% match</span>
            </div>

            <h3 className="font-semibold text-sm mb-2 line-clamp-2">{match.headline}</h3>

            <div className="border-t pt-3 mt-3">
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{match.market.question}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{(match.market.price * 100).toFixed(0)}¢</span>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/market/${match.market.slug}`}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Bet
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
