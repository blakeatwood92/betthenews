import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarketCard } from "@/components/market-card"
import { NewsMatchCard } from "@/components/news-match-card"
import { TrendingUp, Newspaper, Target, Zap } from "lucide-react"
import Link from "next/link"
import { TOPIC_MAP } from "@/data/topics"
import { polymarket } from "@/lib/polymarket"
import { matchingEngine } from "@/lib/matching"
import type { Metadata } from "next"

interface TopicPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const topic = TOPIC_MAP[params.slug]

  if (!topic) {
    return {
      title: "Topic Not Found - BetTheNews",
    }
  }

  return {
    title: `${topic.title} - BetTheNews`,
    description: topic.description || `Prediction markets and news about ${topic.title}`,
    openGraph: {
      title: `${topic.title} Markets & News`,
      description: topic.description || `Prediction markets and news about ${topic.title}`,
      type: "website",
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = TOPIC_MAP[params.slug]

  if (!topic) {
    notFound()
  }

  // Fetch related markets and news matches
  const [allMarkets, newsMatches] = await Promise.all([
    polymarket.getMarkets({ limit: 100 }),
    matchingEngine.matchNewsWithMarkets(),
  ])

  // Filter markets by topic tags
  const relatedMarkets = allMarkets.filter((market) => market.tags.some((tag) => topic.tags.includes(tag))).slice(0, 12)

  // Filter news matches by topic
  const topicNewsMatches = newsMatches
    .filter(
      (match) =>
        match.news.topic === params.slug ||
        match.matches.some((m) => m.market.tags.some((tag) => topic.tags.includes(tag))),
    )
    .slice(0, 6)

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
        {/* Topic Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
          {topic.description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">{topic.description}</p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {topic.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/go/pm">
                <TrendingUp className="mr-2 h-5 w-5" />
                Start Trading
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/news-to-bets?topic=${params.slug}`}>
                <Newspaper className="mr-2 h-5 w-5" />
                View News Matches
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Active Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">{relatedMarkets.length}</div>
              <p className="text-sm text-muted-foreground">Markets you can bet on right now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Newspaper className="mr-2 h-5 w-5 text-primary" />
                News Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">{topicNewsMatches.length}</div>
              <p className="text-sm text-muted-foreground">Recent news with betting opportunities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Total Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">
                ${Math.round(relatedMarkets.reduce((sum, m) => sum + m.volume_num, 0) / 1000000)}M
              </div>
              <p className="text-sm text-muted-foreground">Trading volume across all markets</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent News Matches */}
        {topicNewsMatches.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest News → Bets</h2>
              <Button variant="outline" asChild>
                <Link href={`/news-to-bets?topic=${params.slug}`}>View All</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {topicNewsMatches.slice(0, 4).map((match, index) => (
                <NewsMatchCard key={index} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Related Markets */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Markets</h2>
            <Button variant="outline" asChild>
              <Link href={`/markets?tag=${encodeURIComponent(topic.tags[0])}`}>View All</Link>
            </Button>
          </div>

          {relatedMarkets.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No active markets found</h3>
                <p className="text-muted-foreground mb-4">
                  Check back later for new {topic.title.toLowerCase()} markets.
                </p>
                <Button asChild>
                  <Link href="/markets">Browse All Markets</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}
        </section>

        {/* Topic Queries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What We Track</h2>
          <Card>
            <CardHeader>
              <CardTitle>Search Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We monitor news for these key terms and phrases to find relevant betting opportunities:
              </p>
              <div className="flex flex-wrap gap-2">
                {topic.queries.map((query) => (
                  <Badge key={query} variant="outline">
                    "{query}"
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-primary/5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to bet on {topic.title.toLowerCase()}?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already turning their knowledge into profits.
          </p>
          <Button size="lg" asChild>
            <Link href="/go/pm">Get Started with $10 Bonus</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
