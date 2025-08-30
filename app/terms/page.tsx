import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Polymarket Live",
  description: "Terms of Service for Polymarket Live - Rules and guidelines for using our service.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Polymarket Live is an information service that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Displays live prediction market data and odds</li>
                <li>Provides breaking news related to prediction markets</li>
                <li>Offers educational content about prediction markets</li>
                <li>Links to third-party trading platforms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Not Financial Advice</p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  We provide information only. Nothing on this site constitutes financial, investment, or trading
                  advice.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔗 Independent Service</p>
                <p className="text-blue-700 dark:text-blue-300">
                  We are not affiliated with Polymarket or any trading platform. We are an independent information
                  service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be 18+ to use prediction market platforms</li>
                <li>Check local laws regarding prediction market participation</li>
                <li>Trade responsibly and within your means</li>
                <li>Verify all information independently before making decisions</li>
                <li>Use our service for informational purposes only</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Affiliate Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We earn commissions when users sign up for platforms through our affiliate links. This helps us maintain
                our free service while remaining independent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We provide information "as is" without warranties. We are not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Trading losses or financial decisions</li>
                <li>Accuracy of third-party data or platforms</li>
                <li>Service interruptions or technical issues</li>
                <li>Any damages arising from use of our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Questions about these terms? Contact: legal@polymarketlive.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
