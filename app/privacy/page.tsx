import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Polymarket Live",
  description: "Privacy Policy for Polymarket Live - How we collect, use, and protect your information.",
}

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We collect minimal information to provide our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usage analytics (page views, clicks) via Google Analytics</li>
                <li>Technical information (browser type, IP address) for security</li>
                <li>No personal information is required to use our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve our service and user experience</li>
                <li>Analyze traffic patterns and popular content</li>
                <li>Ensure security and prevent abuse</li>
                <li>We never sell or share personal data with third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics to understand site usage</li>
                <li>Essential site functionality</li>
                <li>You can disable cookies in your browser settings</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use these third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for usage statistics</li>
                <li>Vercel for hosting and performance</li>
                <li>Polymarket API for market data (no personal data shared)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For privacy questions, contact us at: privacy@polymarketlive.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
