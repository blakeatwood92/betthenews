import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Wallet, ArrowRight, DollarSign, Zap, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Deposit USDC and Trade on Polymarket - Complete Step-by-Step Guide",
  description:
    "Learn how to fund your Polymarket account with USDC and make your first prediction market trade. Complete beginner's guide with screenshots and tips.",
  openGraph: {
    title: "How to Deposit USDC and Trade on Polymarket - Complete Guide",
    description: "Step-by-step tutorial for depositing USDC and making your first prediction market trade.",
    type: "article",
  },
}

export default function DepositAndTradeGuide() {
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
            <Button asChild>
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Guides
          </Link>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">Intermediate</Badge>
            <span className="text-sm text-muted-foreground">10 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">How to Deposit USDC and Trade on Polymarket</h1>
          <p className="text-xl text-muted-foreground">
            Complete step-by-step guide to funding your account and making your first prediction market trade.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Quick Start Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Before You Start:</h4>
                <ul className="space-y-1 text-sm">
                  <li>✅ Crypto wallet (MetaMask recommended)</li>
                  <li>✅ USDC tokens to deposit</li>
                  <li>✅ Valid ID for verification</li>
                  <li>✅ Stable internet connection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• How to create and verify your account</li>
                  <li>• How to deposit USDC safely</li>
                  <li>• How to place your first trade</li>
                  <li>• Tips for successful trading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            Step 1: Create Your Polymarket Account
          </h2>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Visit Polymarket</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the button below to go to Polymarket's official website
                    </p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/go/pm" className="inline-flex items-center gap-2">
                    Go to Polymarket <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Connect Your Wallet</h4>
                    <p className="text-sm text-muted-foreground">Connect your MetaMask or other compatible wallet</p>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Don't have a wallet?</strong> Download MetaMask from metamask.io and set it up before
                    continuing. Make sure to securely store your seed phrase!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Complete Identity Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload a valid government ID and complete KYC verification
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm">
                    <strong>Why verification?</strong> Polymarket requires KYC to comply with financial regulations and
                    ensure platform security. This process typically takes 5-10 minutes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Step 2: Get USDC Tokens
          </h2>

          <p className="mb-6">
            Polymarket uses USDC (USD Coin) for all trades. USDC is a stablecoin pegged to the US dollar, making it
            perfect for prediction markets since $1 USDC = $1 USD.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Option 1: Buy USDC Directly</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Use Coinbase, Binance, or other exchanges</li>
                  <li>• Buy with credit card or bank transfer</li>
                  <li>• Transfer to your MetaMask wallet</li>
                  <li>• Usually fastest for beginners</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Option 2: Convert Other Crypto</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Swap ETH, BTC, or other tokens for USDC</li>
                  <li>• Use Uniswap or other DEX platforms</li>
                  <li>• Good if you already hold crypto</li>
                  <li>• Watch out for gas fees</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-700">💡 Pro Tip: Start Small</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                For your first deposit, start with $50-100 USDC to get familiar with the platform. You can always
                deposit more later as you gain experience.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-primary" />
            Step 3: Deposit USDC to Polymarket
          </h2>

          <div className="space-y-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold">Navigate to Deposit</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Once logged in, click "Deposit" in the top navigation or go to your wallet section.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold">Select USDC Amount</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter the amount of USDC you want to deposit. The platform will show your current wallet balance.
                </p>
                <div className="bg-muted p-3 rounded text-sm">
                  <strong>Gas Fees:</strong> Remember that you'll need some ETH in your wallet to pay for transaction
                  fees.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold">Confirm Transaction</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review the transaction details and confirm in your MetaMask wallet. The deposit usually takes 1-3
                  minutes to process.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Step 4: Make Your First Trade
          </h2>

          <p className="mb-6">
            Now for the exciting part - placing your first prediction market trade! Let's walk through finding a market
            and making a trade.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Finding Markets to Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Browse by Category</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Politics - Elections, policy outcomes</li>
                    <li>• Sports - Game outcomes, season winners</li>
                    <li>• Crypto - Price predictions, protocol launches</li>
                    <li>• Business - Earnings, mergers, IPOs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Look for High Volume Markets</h4>
                  <p className="text-sm text-muted-foreground">
                    Markets with more trading volume typically have better prices and easier entry/exit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold">Choose Your Market</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click on a market that interests you. Read the market description carefully to understand exactly what
                  you're betting on and the resolution criteria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold">Select Your Position</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose "Yes" if you think the event will happen, or "No" if you think it won't. The price shows the
                  market's current probability.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm">
                  <strong>Example:</strong> If "Yes" costs $0.65, the market thinks there's a 65% chance the event will
                  happen.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold">Enter Your Amount</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter how much USDC you want to spend. The platform will show your potential profit and the number of
                  shares you'll receive.
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded text-sm">
                  <strong>Profit Calculation:</strong> If you buy "Yes" at $0.65 and the event happens, you'll receive
                  $1.00 per share (profit of $0.35 per share).
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <h4 className="font-semibold">Review and Confirm</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Double-check your trade details, then click "Buy" and confirm the transaction in your wallet. Your
                  position will appear in your portfolio once confirmed.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Trading Tips for Success</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">✅ Do This</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Start with small amounts while learning</li>
                  <li>• Research events thoroughly before trading</li>
                  <li>• Diversify across multiple markets</li>
                  <li>• Set a budget and stick to it</li>
                  <li>• Take profits when you're ahead</li>
                  <li>• Learn from both wins and losses</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600">❌ Avoid This</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Don't bet more than you can afford to lose</li>
                  <li>• Don't chase losses with bigger bets</li>
                  <li>• Don't ignore market resolution criteria</li>
                  <li>• Don't trade based on emotions</li>
                  <li>• Don't put all money in one market</li>
                  <li>• Don't forget about gas fees</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Ready to Start Trading?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You now have everything you need to start trading on Polymarket. Remember to start small, do your
                research, and trade responsibly.
              </p>
              <Button size="lg" asChild>
                <Link href="/go/pm" className="inline-flex items-center gap-2">
                  Get Started with $10 Bonus <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Related Guides */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-bold mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">How Odds Work</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Understand implied probability and how to read market prices.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/guides/how-odds-work">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Responsible Wagering</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Best practices for safe and responsible prediction market trading.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/guides/responsible-wagering">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
