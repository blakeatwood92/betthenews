import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, TrendingUp, Target, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How Odds Work in Prediction Markets - Complete Guide | BetTheNews",
  description:
    "Learn how to read prediction market odds, understand implied probability, and calculate potential profits. Complete guide with examples and calculations.",
  openGraph: {
    title: "How Odds Work in Prediction Markets - Complete Guide",
    description: "Master prediction market odds and probability calculations with our comprehensive guide.",
    type: "article",
  },
}

export default function HowOddsWorkPage() {
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
            <Badge variant="outline">7 min read</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">How Odds Work in Prediction Markets</h1>
          <p className="text-xl text-muted-foreground">
            Master the math behind prediction markets and learn how to calculate probabilities and potential profits.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">The Basics: Price = Probability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In prediction markets, the price of a share directly represents the market's belief about the
                probability of an event occurring. This is the fundamental concept you need to understand.
              </p>

              <Card className="bg-primary/5 border-primary/20 mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Key Formula</h3>
                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-center font-mono text-lg">
                      <strong>Price (in cents) = Probability (%)</strong>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    A share priced at 65¢ means the market thinks there's a 65% chance the event will happen.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">25¢</div>
                    <div className="text-sm text-muted-foreground">25% chance</div>
                    <div className="text-xs text-muted-foreground mt-1">Unlikely</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">50¢</div>
                    <div className="text-sm text-muted-foreground">50% chance</div>
                    <div className="text-xs text-muted-foreground mt-1">Coin flip</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">85¢</div>
                    <div className="text-sm text-muted-foreground">85% chance</div>
                    <div className="text-xs text-muted-foreground mt-1">Very likely</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Calculating Your Potential Profit</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Understanding how much you can win or lose is crucial for making informed trading decisions.
              </p>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5 text-primary" />
                    Profit Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">If you're RIGHT:</h4>
                      <p className="font-mono">Profit = $1.00 - Purchase Price</p>
                      <p className="text-sm text-muted-foreground">Each winning share pays out exactly $1.00</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">If you're WRONG:</h4>
                      <p className="font-mono">Loss = Purchase Price</p>
                      <p className="text-sm text-muted-foreground">Losing shares become worthless ($0.00)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-semibold mb-3">Example Calculations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">Scenario A: You Win</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• You buy 10 shares at 30¢ each</li>
                      <li>• Total cost: $3.00</li>
                      <li>• Event happens (you're right!)</li>
                      <li>• Payout: 10 × $1.00 = $10.00</li>
                      <li className="font-semibold text-green-700 dark:text-green-300">
                        • Profit: $10.00 - $3.00 = $7.00
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">Scenario B: You Lose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• You buy 10 shares at 30¢ each</li>
                      <li>• Total cost: $3.00</li>
                      <li>• Event doesn't happen (you're wrong)</li>
                      <li>• Payout: 10 × $0.00 = $0.00</li>
                      <li className="font-semibold text-red-700 dark:text-red-300">• Loss: $3.00</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Reading Market Signals</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Price movements tell you a story about what the market is thinking. Here's how to interpret them.
              </p>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      Rising Prices (Bullish)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">When prices go from 40¢ → 60¢, it means:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• More people think the event will happen</li>
                      <li>• New information supports the "Yes" outcome</li>
                      <li>• Market confidence is increasing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="mr-2 h-5 w-5 text-red-600" />
                      Falling Prices (Bearish)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">When prices go from 70¢ → 45¢, it means:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Fewer people think the event will happen</li>
                      <li>• New information supports the "No" outcome</li>
                      <li>• Market confidence is decreasing</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Advanced Concepts</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Implied Probability vs. Your Belief</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      The key to profitable trading is finding markets where your assessment differs from the market's
                      implied probability.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>Example:</strong> Market price is 30¢ (30% chance), but you think there's a 50% chance.
                        This could be a good buying opportunity.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk vs. Reward</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Low Price = High Reward, High Risk</h4>
                        <p className="text-sm text-muted-foreground">
                          Buying at 10¢ means big profits if you're right, but low probability of winning.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">High Price = Low Reward, Low Risk</h4>
                        <p className="text-sm text-muted-foreground">
                          Buying at 90¢ means small profits but high probability of winning.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Practice Makes Perfect</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The best way to understand odds is to start trading with small amounts and see how the math works in
                practice.
              </p>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Ready to Start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get a $10 bonus when you sign up and make your first trade. Perfect for practicing with real money
                    but low risk.
                  </p>
                  <Button asChild>
                    <Link href="/go/pm">Claim Your $10 Bonus</Link>
                  </Button>
                </CardContent>
              </Card>
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
                <CardTitle className="text-lg">How to Deposit USDC and Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Step-by-step guide to funding your account and making your first trade.
                </p>
                <Button size="sm" asChild>
                  <Link href="/guides/how-to-deposit-usdc-and-trade">Read Next</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsible Wagering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to trade safely and manage your risk effectively.
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
