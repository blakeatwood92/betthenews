import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Calculator, Shield, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prediction Market Guides - Learn How to Bet on News | BetTheNews",
  description:
    "Learn how prediction markets work, understand odds, and discover responsible betting strategies. Complete guides for beginners and experienced traders.",
  openGraph: {
    title: "Prediction Market Guides - Learn How to Bet on News",
    description: "Complete guides to help you understand and succeed in prediction markets.",
    type: "website",
  },
}

const guides = [
  {
    slug: "what-is-a-prediction-market",
    title: "What is a Prediction Market?",
    description: "Learn the basics of prediction markets and how they work",
    icon: BookOpen,
    difficulty: "Beginner",
    readTime: "5 min",
  },
  {
    slug: "how-odds-work",
    title: "How Odds Work",
    description: "Understand implied probability and how to read market prices",
    icon: Calculator,
    difficulty: "Beginner",
    readTime: "7 min",
  },
  {
    slug: "is-polymarket-legal-in-us-and-canada",
    title: "Is Polymarket Legal in US and Canada?",
    description: "Legal status and availability in different jurisdictions",
    icon: Shield,
    difficulty: "Beginner",
    readTime: "4 min",
  },
  {
    slug: "how-to-deposit-usdc-and-trade",
    title: "How to Deposit USDC and Trade",
    description: "Step-by-step guide to funding your account and making trades",
    icon: TrendingUp,
    difficulty: "Intermediate",
    readTime: "10 min",
  },
  {
    slug: "responsible-wagering",
    title: "Responsible Wagering",
    description: "Best practices for safe and responsible prediction market trading",
    icon: Shield,
    difficulty: "Important",
    readTime: "6 min",
  },
]

export default function GuidesPage() {
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
            </nav>
            <Button asChild>
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Prediction Market Guides</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn everything you need to know about prediction markets, from the basics to advanced trading strategies.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Card key={guide.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{guide.readTime} read</span>
                    <Button size="sm" asChild>
                      <Link href={`/guides/${guide.slug}`}>Read Guide</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to start betting on the news?</h2>
          <p className="text-muted-foreground mb-6">Put your knowledge to work and get a $10 bonus when you sign up.</p>
          <Button size="lg" asChild>
            <Link href="/go/pm">Get Started with $10 Bonus</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
