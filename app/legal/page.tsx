import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, AlertTriangle, Mail, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Terms & Privacy Policy | BetTheNews",
  description:
    "Read our terms of service, privacy policy, and legal disclaimers. Important information about using BetTheNews and prediction market trading.",
  openGraph: {
    title: "Legal Terms & Privacy Policy | BetTheNews",
    description: "Important legal information and terms of service for BetTheNews users.",
    type: "website",
  },
}

export default function LegalPage() {
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Legal Terms & Privacy</h1>
          <p className="text-xl text-muted-foreground">
            Important information about using BetTheNews and prediction market trading.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700 dark:text-orange-300">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 dark:text-orange-300">
              BetTheNews is an independent information and affiliate website. We do not provide trading services,
              financial advice, or operate prediction markets. All trading occurs on third-party platforms like
              Polymarket.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-12">
          {/* Terms of Service */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="mr-3 h-6 w-6 text-primary" />
              Terms of Service
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing and using BetTheNews, you accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Service Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    BetTheNews provides information about prediction markets and news events. We aggregate data from
                    public sources and provide educational content about prediction market trading.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>We are an information and affiliate website only</li>
                    <li>We do not operate prediction markets or handle user funds</li>
                    <li>All trading occurs on third-party platforms</li>
                    <li>We may earn affiliate commissions from referrals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Age and Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    You must be at least 18 years old (or 19 in some Canadian provinces) to use this service. Prediction
                    market trading may not be available in all jurisdictions.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Geographic Restrictions:</p>
                    <p className="text-sm text-muted-foreground">
                      Availability of prediction market trading varies by jurisdiction and may change over time. Users
                      are responsible for complying with their local laws and regulations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. No Financial Advice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Nothing on this website constitutes financial, investment, or trading advice. All content is for
                    informational and educational purposes only.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>We do not recommend specific trades or investments</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>Trading involves risk of loss</li>
                    <li>Consult qualified professionals for financial advice</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    BetTheNews shall not be liable for any direct, indirect, incidental, special, consequential, or
                    punitive damages resulting from your use of this service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">We collect minimal information to provide our service:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <strong>Usage Data:</strong> Pages visited, time spent, referral sources (anonymized)
                    </li>
                    <li>
                      <strong>Click Tracking:</strong> Affiliate link clicks for commission tracking
                    </li>
                    <li>
                      <strong>Technical Data:</strong> Browser type, device type, IP address (for analytics only)
                    </li>
                  </ul>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <strong>We do NOT collect:</strong> Personal information, email addresses, financial data, or
                      account credentials. We respect Do-Not-Track browser settings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Improve website performance and user experience</li>
                    <li>Track affiliate referrals for commission purposes</li>
                    <li>Analyze usage patterns to create better content</li>
                    <li>Comply with legal requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">We use the following third-party services:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>
                      <strong>Vercel:</strong> Website hosting and analytics
                    </li>
                    <li>
                      <strong>Polymarket:</strong> Market data and affiliate program
                    </li>
                    <li>
                      <strong>Google News:</strong> News feed aggregation
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Each service has its own privacy policy governing data collection and use.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Responsible Gambling */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Responsible Wagering</h2>

            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">
                  Prediction market trading should be approached responsibly:
                </h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2">
                  <li>Only trade with money you can afford to lose</li>
                  <li>Set limits on your trading activity</li>
                  <li>Take breaks and don't chase losses</li>
                  <li>Seek help if trading becomes problematic</li>
                </ul>

                <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Need Help?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    If you or someone you know has a gambling problem, resources are available:
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• National Problem Gambling Helpline: 1-800-522-4700</li>
                    <li>• Gamblers Anonymous: www.gamblersanonymous.org</li>
                    <li>• Responsible Gambling Council (Canada): www.responsiblegambling.org</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Mail className="mr-3 h-6 w-6 text-primary" />
              Contact Us
            </h2>

            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Questions about these terms or our service? We're here to help.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>General Inquiries:</strong> Contact us through our{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact page
                    </Link>
                  </p>
                  <p className="text-sm">
                    <strong>Legal Questions:</strong> Please consult with qualified legal counsel
                  </p>
                  <p className="text-sm">
                    <strong>Technical Issues:</strong> Report bugs or technical problems via our contact form
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>These terms may be updated from time to time. Continued use constitutes acceptance of any changes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
