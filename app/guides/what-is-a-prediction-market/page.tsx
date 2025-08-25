import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, TrendingUp, Users, DollarSign, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What is a Prediction Market? Complete Beginner's Guide | BetTheNews",
  description:
    "Learn how prediction markets work, why they're accurate, and how you can use them to bet on news events. Complete beginner's guide with examples.",
  openGraph: {
    title: "What is a Prediction Market? Complete Beginner's Guide",
    description: "Learn how prediction markets work and why they're so accurate at predicting future events.",
    type: "article",
  },
}

export default function WhatIsAPredictionMarketPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/guides">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Guides
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
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Beginner</Badge>
            <Badge variant="outline">5 min read</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">What is a Prediction Market?</h1>
          <p className="text-xl text-muted-foreground">
            Learn how prediction markets work, why they're accurate, and how you can use them to bet on news events.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">The Simple Explanation</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A prediction market is like a stock market, but instead of buying shares in companies, you're buying
                shares in the outcome of future events. Think of it as "betting with a purpose" - you're not just
                gambling, you're contributing to a collective intelligence system that predicts the future.
              </p>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quick Example</h3>
                  <p className="text-sm text-muted-foreground">
                    If there's a 70% chance it will rain tomorrow, you can buy "Yes" shares for 70¢ each. If it rains,
                    your shares are worth $1. If it doesn't rain, they're worth $0. The price reflects the market's
                    collective belief about the probability.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How Do They Work?</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Market Prices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Prices range from $0 to $1 (or 0¢ to 100¢). A price of 65¢ means the market thinks there's a 65%
                      chance the event will happen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Collective Wisdom
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      When many people trade based on their knowledge and research, the market price becomes a very
                      accurate prediction.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mb-3">The Trading Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>A question is posed: "Will it rain in New York tomorrow?"</li>
                <li>People buy "Yes" or "No" shares based on their beliefs</li>
                <li>Prices adjust based on supply and demand</li>
                <li>When the event happens, winning shares pay out $1, losing shares pay $0</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why Are They So Accurate?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Prediction markets consistently outperform polls, experts, and other forecasting methods. Here's why:
              </p>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Incentives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      People put real money on the line, so they're motivated to research and think carefully about
                      their predictions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aggregated Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Markets combine information from thousands of participants, each bringing their own knowledge and
                      perspective.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Self-Correcting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      If the market price is wrong, smart traders can profit by correcting it, which automatically
                      improves accuracy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Real-World Examples</h2>
              <div className="space-y-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Election Predictions</h3>
                    <p className="text-sm text-muted-foreground">
                      "Will Joe Biden win the 2024 election?" - Traders buy and sell based on polls, news, campaign
                      performance, and insider knowledge.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Economic Events</h3>
                    <p className="text-sm text-muted-foreground">
                      "Will the Fed raise interest rates in March?" - Financial professionals and economists trade based
                      on economic data and Fed communications.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Sports & Entertainment</h3>
                    <p className="text-sm text-muted-foreground">
                      "Will Taylor Swift announce a new album this year?" - Fans and industry insiders trade based on
                      social media clues and industry knowledge.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ready to try prediction markets? Here's what you need to know to get started safely and successfully.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <DollarSign className="mr-2 h-5 w-5 text-primary" />
                      Start Small
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Begin with small amounts while you learn. Even $5-10 trades can be educational and fun.
                    </p>
                    <Button size="sm" asChild>
                      <Link href="/go/pm">Get $10 Bonus</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      Learn More
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Read our other guides to understand odds, trading strategies, and responsible wagering.
                    </p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/guides">More Guides</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Related Guides */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How Odds Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to read market prices and understand implied probability.
                </p>
                <Button size="sm" asChild>
                  <Link href="/guides/how-odds-work">Read Next</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsible Wagering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Best practices for safe and responsible prediction market trading.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/guides/responsible-wagering">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
