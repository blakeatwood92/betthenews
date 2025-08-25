import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, Star, CheckCircle, Zap, Gift } from "lucide-react"
import Link from "next/link"
import { PromoBanner } from "@/components/promo-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get $10 Bonus - Start Betting on News | BetTheNews",
  description:
    "New users get a $10 bonus when they sign up and make their first trade on Polymarket. Learn how to qualify and start betting on the news.",
  openGraph: {
    title: "Get $10 Bonus - Start Betting on News",
    description: "New users get a $10 bonus when they sign up and make their first trade on Polymarket.",
    type: "website",
  },
}

export default function PromosPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              <Star className="h-3 w-3 mr-1" />
              Limited Time Offer
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your <span className="text-primary">$10 Bonus</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            New users receive a $10 bonus when they sign up and make their first trade on Polymarket. Start betting on
            the news today.
          </p>
          <Button size="lg" asChild>
            <Link href="/go/pm">
              <DollarSign className="mr-2 h-5 w-5" />
              Claim Your $10 Bonus
            </Link>
          </Button>
        </div>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How to Get Your Bonus</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <CardTitle>Sign Up</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Create your Polymarket account through our link. It's free and takes less than 2 minutes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <CardTitle>Make Your First Trade</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Place your first bet on any market. Start small - even $1 qualifies for the bonus.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <CardTitle>Get Your $10</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Your $10 bonus will be credited to your account within 24 hours of your first trade.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Bonus Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• New Polymarket users only</li>
                    <li>• Must be 18+ years old</li>
                    <li>• Available in eligible jurisdictions</li>
                    <li>• One bonus per person/household</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sign up through BetTheNews link</li>
                    <li>• Complete account verification</li>
                    <li>• Make first trade within 30 days</li>
                    <li>• Minimum trade amount: $1</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Important Notes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bonus credited within 24 hours of first trade</li>
                  <li>• Bonus funds can be used for trading immediately</li>
                  <li>• Standard Polymarket terms and conditions apply</li>
                  <li>• BetTheNews is an affiliate partner, not a trading platform</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <PromoBanner variant="hero" className="mb-12" />

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does it take to get the bonus?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your $10 bonus will be credited to your Polymarket account within 24 hours of completing your first
                  trade.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the minimum trade amount?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You only need to trade $1 to qualify for the bonus. Start small and learn how prediction markets work.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I withdraw the bonus immediately?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The bonus can be used for trading immediately. Withdrawal terms are subject to Polymarket's standard
                  policies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is this available worldwide?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Availability depends on Polymarket's supported jurisdictions. Check their terms for your specific
                  location.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
