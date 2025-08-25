import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { BreakingItem } from "@/components/breaking-item"
import { config } from "@/lib/config"
import type { BreakingItem as BreakingItemType } from "@/types"

async function getBreakingNews(): Promise<BreakingItemType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/breaking`, {
      next: { revalidate: 60 }, // Revalidate every minute
    })
    if (!response.ok) throw new Error("Failed to fetch breaking news")
    return await response.json()
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

export default async function BreakingPage() {
  const breakingNews = await getBreakingNews()
  const polymarketItems = breakingNews.filter((item) => item.yes !== undefined && item.delta !== undefined)
  const newsItems = breakingNews.filter((item) => item.source !== undefined)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Polymarket Live</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/markets" className="text-sm hover:text-primary transition-colors">
                Markets
              </Link>
            </nav>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                Start Trading
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">Breaking News & Market Moves</h1>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Live Updates
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Markets that moved most in the last 24 hours and breaking news that could impact prediction markets. Updated
            every minute.
          </p>
        </div>

        {/* Market Moves Section */}
        {polymarketItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Biggest Market Moves (24h)</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {polymarketItems.length} markets
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {polymarketItems.map((item, index) => (
                <BreakingItem key={index} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Breaking News Section */}
        {newsItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Breaking News</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                {newsItems.length} stories
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsItems.map((item, index) => (
                <BreakingItem key={index} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {breakingNews.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold mb-4">No Breaking News Right Now</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We're monitoring markets and news sources for breaking developments. Check back soon for the latest
              updates.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/markets">Browse All Markets</Link>
              </Button>
              <Button asChild>
                <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                  Start Trading
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Refresh Notice */}
        <div className="mt-12 p-4 bg-muted/30 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>This page updates automatically every minute with the latest market moves and breaking news.</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center py-12 bg-primary/5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Trade on Breaking News</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            When news breaks, markets move. Join Polymarket to trade on real-world events as they unfold.
          </p>
          <Button size="lg" asChild className="hover:scale-105 transition-transform">
            <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
              Start Trading on Polymarket
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
