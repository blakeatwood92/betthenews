import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Globe, DollarSign } from "lucide-react"
import Link from "next/link"
import { PromoBanner } from "@/components/promo-banner"
import { LiveNewsRail } from "@/components/live-news-rail"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BetTheNews</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/news-to-bets" className="text-sm hover:text-primary transition-colors">
                News → Bets
              </Link>
              <Link href="/markets" className="text-sm hover:text-primary transition-colors">
                Markets
              </Link>
              <Link href="/content" className="text-sm hover:text-primary transition-colors">
                Content
              </Link>
              <Link href="/guides" className="text-sm hover:text-primary transition-colors">
                Guides
              </Link>
            </nav>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            If it's in the news, <span className="text-primary">it's on the board</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Turn breaking news into prediction market opportunities. Discover what you can bet on from today's
            headlines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <Button size="lg" asChild className="hover:scale-105 transition-transform">
              <Link href="/go/pm">
                <DollarSign className="mr-2 h-5 w-5" />
                Start with $10 Bonus
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="/news-to-bets">
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore News → Bets
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <PromoBanner variant="hero" />
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Trending Topics</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Politics", "Economy", "World", "Tech", "Sports", "Weather"].map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href={`/topic/${topic.toLowerCase()}`}>{topic}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Live News Rail */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Live News → Bets</h2>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="/news-to-bets">View All</Link>
            </Button>
          </div>
          <LiveNewsRail />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Real-Time Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our algorithm automatically connects breaking news to relevant prediction markets in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Live Market Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get real-time prices, trends, and liquidity data from Polymarket's prediction markets.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  Global Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From US politics to global events, discover betting opportunities across all major news categories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto text-center relative">
          <h2 className="text-3xl font-bold mb-4">Ready to bet on the news?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already turning their news knowledge into profits.
          </p>
          <Button size="lg" asChild className="hover:scale-105 transition-transform">
            <Link href="/go/pm">Get Started with $10 Bonus</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold">BetTheNews</span>
              </div>
              <p className="text-sm text-muted-foreground">If it's in the news, it's on the board.</p>
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
                  <Link href="/topic/politics" className="hover:text-primary transition-colors">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="/topic/economy" className="hover:text-primary transition-colors">
                    Economy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Learn</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/guides" className="hover:text-primary transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/what-is-a-prediction-market" className="hover:text-primary transition-colors">
                    What are prediction markets?
                  </Link>
                </li>
                <li>
                  <Link href="/guides/how-odds-work" className="hover:text-primary transition-colors">
                    How odds work
                  </Link>
                </li>
                <li>
                  <Link href="/content" className="hover:text-primary transition-colors">
                    Content & Insights
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
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              BetTheNews is an independent information and affiliate website. We do not provide trading services or
              financial advice. 18+ only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
