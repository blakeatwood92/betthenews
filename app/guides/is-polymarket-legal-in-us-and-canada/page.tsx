import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Is Polymarket Legal in US and Canada? Complete Legal Guide 2024",
  description:
    "Comprehensive guide to Polymarket's legal status in the US and Canada. Learn about regulations, restrictions, and how to access prediction markets legally.",
  openGraph: {
    title: "Is Polymarket Legal in US and Canada? Complete Legal Guide 2024",
    description:
      "Everything you need to know about Polymarket's legal status and how to access prediction markets safely.",
    type: "article",
  },
}

export default function PolymarketLegalGuide() {
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
            <Badge variant="secondary">Beginner</Badge>
            <span className="text-sm text-muted-foreground">4 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Is Polymarket Legal in US and Canada?</h1>
          <p className="text-xl text-muted-foreground">
            Understanding the legal landscape of prediction markets and how to access them safely.
          </p>
        </div>

        {/* Quick Answer */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Quick Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <strong>Yes, Polymarket is legal and accessible in most countries including Canada.</strong>
              However, US residents currently cannot access Polymarket directly due to regulatory restrictions. The
              platform operates under proper licensing and regulation in supported jurisdictions.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Legal Status by Region
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-green-600">✅ Canada - Fully Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Canadian residents can freely access and use Polymarket. The platform operates legally under Canadian
                financial regulations and provides full service to Canadian users.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>No restrictions on account creation or trading</li>
                <li>Full access to all markets and features</li>
                <li>Regulated under Canadian financial laws</li>
                <li>USDC deposits and withdrawals supported</li>
              </ul>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/go/pm" className="inline-flex items-center gap-2">
                    Start Trading from Canada <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                🇺🇸 United States - Currently Restricted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                US residents cannot currently access Polymarket due to regulatory compliance. The platform proactively
                blocks US IP addresses and requires identity verification to prevent US users from creating accounts.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>IP-based blocking for US addresses</li>
                <li>KYC verification prevents US account creation</li>
                <li>Compliance with CFTC regulations</li>
                <li>Alternative platforms available for US users</li>
              </ul>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Why These Restrictions Exist</h2>

          <p>
            The regulatory landscape for prediction markets varies significantly between countries. In the US, the
            Commodity Futures Trading Commission (CFTC) has strict rules about event-based derivatives and prediction
            markets.
          </p>

          <p>
            Polymarket chose to restrict US access to ensure full compliance with these regulations rather than operate
            in a legal gray area. This demonstrates the platform's commitment to regulatory compliance and user
            protection.
          </p>

          <h2 className="text-2xl font-bold mb-4">How Polymarket Ensures Compliance</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Geographic Restrictions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• IP address verification</li>
                  <li>• VPN detection systems</li>
                  <li>• Account creation blocking</li>
                  <li>• Transaction monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Identity Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• KYC (Know Your Customer) checks</li>
                  <li>• Document verification</li>
                  <li>• Address confirmation</li>
                  <li>• Ongoing compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">What This Means for You</h2>

          <Card className="mb-6 bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">If You're in Canada or Other Supported Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You can safely and legally use Polymarket to trade on prediction markets. The platform provides full
                regulatory compliance and user protection.
              </p>
              <Button asChild size="lg">
                <Link href="/go/pm" className="inline-flex items-center gap-2">
                  Get Started with $10 Bonus <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is it safe to use Polymarket?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Yes, Polymarket operates with proper licensing and regulatory oversight in supported jurisdictions.
                  The platform uses blockchain technology for transparency and has strong security measures in place.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Will Polymarket become available in the US?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Polymarket continues to work with regulators and may expand to additional markets in the future.
                  However, there's no official timeline for US availability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if I try to access from a restricted country?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The platform will detect your location and prevent access. Attempting to circumvent these restrictions
                  violates the terms of service and could result in account closure.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Start Trading?</h3>
            <p className="text-muted-foreground mb-4">
              If you're in a supported country, you can start trading prediction markets today.
            </p>
            <Button size="lg" asChild>
              <Link href="/go/pm">Sign Up for Polymarket</Link>
            </Button>
          </div>
        </div>

        {/* Related Guides */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-bold mb-4">Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">How to Deposit USDC and Trade</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Step-by-step guide to funding your account and making your first trade.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/guides/how-to-deposit-usdc-and-trade">Read Guide</Link>
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
