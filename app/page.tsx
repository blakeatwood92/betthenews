import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, Clock } from "lucide-react"
import Link from "next/link"
import { OddsCard } from "@/components/odds-card"
import { BreakingItem } from "@/components/breaking-item"
import { config } from "@/lib/config"

async function getTrendingMarkets() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/pm/markets?order=liquidity&ascending=false&limit=12&active=true`, {
      next: { revalidate: 20 },
      headers: {
        "User-Agent": "Polymarket-Live/1.0",
      },
    })

    if (!response.ok) {
      console.error("Markets API response not ok:", response.status, response.statusText)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching trending markets:", error)
    return []
  }
}

async function getBreakingNews() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/breaking`, {
      next: { revalidate: 20 },
      headers: {
        "User-Agent": "Polymarket-Live/1.0",
      },
    })

    if (!response.ok) {
      console.error("Breaking API response not ok:", response.status, response.statusText)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

export default async function HomePage() {
  const [trendingMarkets, breakingNews] = await Promise.all([getTrendingMarkets(), getBreakingNews()])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Polymarket Live</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/markets" className="text-sm hover:text-primary transition-colors">
                Markets
              </Link>
              <Link href="/breaking" className="text-sm hover:text-primary transition-colors">
                Breaking
              </Link>
            </nav>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                Start Betting
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Realtime Polymarket <span className="text-primary">Odds + Breaking News</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Live prediction market data and breaking news that moves markets. Track odds, volume, and breaking
            developments in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <Button size="lg" asChild className="hover:scale-105 transition-transform">
              <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                <TrendingUp className="mr-2 h-5 w-5" />
                Start Trading
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="/markets">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Markets
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Markets Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Trending Markets</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Live
              </Badge>
            </div>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="/markets">View All Markets</Link>
            </Button>
          </div>

          {trendingMarkets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trendingMarkets.slice(0, 12).map((market: any) => (
                <OddsCard key={market.id} market={market} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Loading trending markets...</p>
              <p className="text-sm mt-2">If this persists, please check your connection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Breaking Moves Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Breaking Moves (24h)</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Hot
              </Badge>
            </div>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="/breaking">View All Breaking</Link>
            </Button>
          </div>

          {breakingNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breakingNews.slice(0, 12).map((item: any, index: number) => (
                <BreakingItem key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Loading breaking news...</p>
              <p className="text-sm mt-2">If this persists, please check your connection.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto text-center relative">
          <h2 className="text-3xl font-bold mb-4">Ready to trade on Polymarket?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the world's largest prediction market platform and start trading on real-world events.
          </p>
          <Button size="lg" asChild className="hover:scale-105 transition-transform">
            <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-bold">Polymarket Live</span>
              </div>
              <p className="text-sm text-muted-foreground">Real-time prediction market data and breaking news.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Markets</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/markets" className="hover:text-primary transition-colors">
                    All Markets
                  </Link>
                </li>
                <li>
                  <Link href="/breaking" className="hover:text-primary transition-colors">
                    Breaking News
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Trade</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href={config.affiliate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Start Trading
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://polymarket.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Polymarket.com
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/legal" className="hover:text-primary transition-colors">
                    Terms & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              Independent Polymarket data aggregator. Not affiliated with Polymarket. Trading involves risk. 18+ only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
