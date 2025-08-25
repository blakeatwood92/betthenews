import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, Users, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About BetTheNews - Connecting News to Prediction Markets",
  description:
    "Learn about BetTheNews, our mission to connect breaking news with prediction market opportunities, and how we help users discover betting opportunities from headlines.",
  openGraph: {
    title: "About BetTheNews - Connecting News to Prediction Markets",
    description: "Our mission to help users discover betting opportunities from breaking news headlines.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/20 p-4 rounded-full">
              <Zap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">About BetTheNews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We connect breaking news with prediction market opportunities, helping you discover what you can bet on from
            today's headlines.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg text-muted-foreground leading-relaxed">
                "If it's in the news, it's on the board." We believe that prediction markets are powerful tools for
                understanding the future, and we make it easy for anyone to discover betting opportunities from breaking
                news events.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  News-to-Bets Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our algorithm automatically connects breaking news headlines with relevant prediction markets,
                  surfacing betting opportunities you might have missed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Real-Time Market Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide live prices, trends, and liquidity data from Polymarket and other prediction market
                  platforms, all in one place.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Education & Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We create comprehensive guides and educational content to help newcomers understand prediction markets
                  and trade responsibly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Topic Hubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organized topic pages help you focus on specific areas like politics, economics, or world events,
                  making it easy to find relevant markets.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">We Monitor Breaking News</h3>
                    <p className="text-muted-foreground">
                      Our system continuously scans news feeds from major sources, tracking stories across politics,
                      economics, world events, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Smart Matching Algorithm</h3>
                    <p className="text-muted-foreground">
                      Using keyword analysis, topic tagging, and machine learning, we match news stories with relevant
                      prediction markets from Polymarket and other platforms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">You Discover Opportunities</h3>
                    <p className="text-muted-foreground">
                      Browse our News → Bets feed, explore topic hubs, or search for specific events to find betting
                      opportunities you're interested in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Trade on Partner Platforms</h3>
                    <p className="text-muted-foreground">
                      When you find an interesting market, we connect you directly to the trading platform where you can
                      place your bets and potentially earn profits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why We Built This</h2>
          <Card>
            <CardContent className="p-8">
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Prediction markets are incredibly powerful tools for understanding the future, but they can be hard to
                  discover and navigate. Most people don't know that they can bet on whether a specific news event will
                  happen, or they miss opportunities because they don't know where to look.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We created BetTheNews to bridge that gap. By automatically connecting news events with prediction
                  markets, we make it easy for anyone to discover betting opportunities and participate in these
                  fascinating markets.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary">Information</Badge>
                  <Badge variant="secondary">Education</Badge>
                  <Badge variant="secondary">Discovery</Badge>
                  <Badge variant="secondary">Accessibility</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Transparency */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Transparency</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>We're an Affiliate Site</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We earn commissions when users sign up for prediction market platforms through our links. This helps
                  us keep the service free while maintaining our independence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>We Don't Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're an information service only. We don't operate prediction markets, handle user funds, or provide
                  financial advice. All trading happens on third-party platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-6">
            Start discovering betting opportunities from today's breaking news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/news-to-bets">Browse News → Bets</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/guides">Read Our Guides</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
