import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Calendar, DollarSign, TrendingUp, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"
import { polymarket } from "@/lib/polymarket"
import { matchingEngine } from "@/lib/matching"
import { NewsMatchCard } from "@/components/news-match-card"
import type { Metadata } from "next"

interface MarketPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const market = await polymarket.getMarketBySlug(params.slug)

  if (!market) {
    return {
      title: "Market Not Found - BetTheNews",
    }
  }

  return {
    title: `${market.question} - BetTheNews`,
    description: market.description || `Prediction market: ${market.question}`,
    openGraph: {
      title: market.question,
      description: market.description || `Prediction market: ${market.question}`,
      type: "article",
    },
  }
}

export default async function MarketPage({ params }: MarketPageProps) {
  const market = await polymarket.getMarketBySlug(params.slug)

  if (!market) {
    notFound()
  }

  // Get related news matches
  const relatedNews = await matchingEngine.searchMatches(market.question)

  const formatPrice = (price: number) => {
    return `${Math.round(price * 100)}¢`
  }

  const formatLiquidity = (liquidity: number) => {
    if (liquidity >= 1000000) return `$${(liquidity / 1000000).toFixed(1)}M`
    if (liquidity >= 1000) return `$${(liquidity / 1000).toFixed(0)}K`
    return `$${liquidity.toFixed(0)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`
    return `$${volume.toFixed(0)}`
  }

  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = () => {
    const now = new Date()
    const endDate = new Date(market.end_date_iso)

    if (endDate < now) return "destructive"
    if (endDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) return "secondary"
    return "default"
  }

  const getStatusText = () => {
    const now = new Date()
    const endDate = new Date(market.end_date_iso)

    if (endDate < now) return "Ended"
    if (endDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) return "Ending Soon"
    return "Active"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/markets">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Markets
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BetTheNews</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{market.question}</h1>
                <Badge variant={getStatusColor()}>{getStatusText()}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {market.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {market.description && <p className="text-muted-foreground leading-relaxed">{market.description}</p>}
            </div>

            {/* Market Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatLiquidity(market.liquidity_num)}</div>
                    <div className="text-sm text-muted-foreground">Liquidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatVolume(market.volume_num)}</div>
                    <div className="text-sm text-muted-foreground">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{market.outcomes.length}</div>
                    <div className="text-sm text-muted-foreground">Outcomes</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Ends: {formatEndDate(market.end_date_iso)}
                  </div>
                  {market.ancillary_url && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={market.ancillary_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Resolution Source
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Related News</h2>
                <div className="space-y-4">
                  {relatedNews.slice(0, 3).map((match, index) => (
                    <NewsMatchCard key={index} match={match} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Prices */}
            <Card>
              <CardHeader>
                <CardTitle>Current Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {market.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">{outcome.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(outcome.price * 100)}% implied probability
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{formatPrice(outcome.price)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trading Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Start Trading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/go/pm">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Trade on Polymarket
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                  <Link href="/go/pm">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Claim $10 Bonus
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  New users get a $10 bonus when they sign up and make their first trade.
                </p>
              </CardContent>
            </Card>

            {/* Market Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Explore Similar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {market.tags.map((tag) => (
                    <Button key={tag} variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href={`/markets?tag=${encodeURIComponent(tag)}`}>More {tag} markets</Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
