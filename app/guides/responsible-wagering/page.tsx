import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Heart, Brain, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Responsible Wagering Guide - Safe Prediction Market Trading | BetTheNews",
  description:
    "Learn best practices for safe and responsible prediction market trading. Set limits, manage risk, and maintain healthy trading habits.",
  openGraph: {
    title: "Responsible Wagering Guide - Safe Prediction Market Trading",
    description: "Essential guide to responsible trading practices and risk management in prediction markets.",
    type: "article",
  },
}

export default function ResponsibleWageringGuide() {
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
            <Badge variant="destructive">Important</Badge>
            <span className="text-sm text-muted-foreground">6 min read</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Responsible Wagering Guide</h1>
          <p className="text-xl text-muted-foreground">
            Essential practices for safe, sustainable, and enjoyable prediction market trading.
          </p>
        </div>

        {/* Key Principles */}
        <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Heart className="h-5 w-5" />
              Core Principles of Responsible Trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Financial Safety</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Only trade money you can afford to lose</li>
                  <li>• Set strict budgets and stick to them</li>
                  <li>• Never borrow money to trade</li>
                  <li>• Keep trading separate from essential expenses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mental Health</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Trade for fun and learning, not desperation</li>
                  <li>• Take regular breaks from trading</li>
                  <li>• Don't let losses affect your mood</li>
                  <li>• Seek help if trading becomes compulsive</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Setting Your Limits
          </h2>

          <p className="mb-6">
            The most important aspect of responsible wagering is setting clear, realistic limits before you start
            trading and sticking to them no matter what happens.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Set a maximum daily trading amount</li>
                  <li>• Limit time spent trading each day</li>
                  <li>• Take mandatory breaks between sessions</li>
                  <li>• Stop trading after big wins or losses</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
                  <strong>Example:</strong> "I will trade no more than $50 per day and stop after 2 hours."
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Budgets</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Allocate a fixed monthly trading budget</li>
                  <li>• Track all deposits and withdrawals</li>
                  <li>• Review performance monthly</li>
                  <li>• Adjust limits based on results</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                  <strong>Rule of thumb:</strong> Never risk more than 5% of your disposable income.
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Recognizing Problem Gambling
          </h2>

          <p className="mb-6">
            It's crucial to recognize the warning signs of problem gambling and take action if you notice these
            behaviors in yourself.
          </p>

          <Card className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Warning Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Behavioral Signs</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Trading more than planned</li>
                    <li>• Chasing losses with bigger bets</li>
                    <li>• Lying about trading activities</li>
                    <li>• Neglecting work or relationships</li>
                    <li>• Trading to escape problems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Emotional Signs</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Anxiety when not trading</li>
                    <li>• Mood swings based on results</li>
                    <li>• Guilt or shame about trading</li>
                    <li>• Inability to stop despite losses</li>
                    <li>• Trading to feel excitement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Healthy Trading Habits</h2>

          <div className="space-y-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Before You Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Set your budget for the session</li>
                  <li>• Decide on your time limit</li>
                  <li>• Choose your markets in advance</li>
                  <li>• Check your emotional state</li>
                  <li>• Review your trading goals</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">During Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Stick to your predetermined limits</li>
                  <li>• Take breaks every 30-60 minutes</li>
                  <li>• Don't trade when emotional</li>
                  <li>• Keep detailed records of all trades</li>
                  <li>• Stop if you hit your loss limit</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">After Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Review your trades objectively</li>
                  <li>• Update your trading journal</li>
                  <li>• Take time away from trading</li>
                  <li>• Celebrate small wins appropriately</li>
                  <li>• Learn from mistakes without dwelling</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Risk Management Strategies</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Diversification</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Spread trades across multiple markets</li>
                  <li>• Don't put all money in one outcome</li>
                  <li>• Mix different types of events</li>
                  <li>• Balance high and low probability bets</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Position Sizing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Never risk more than 10% on one trade</li>
                  <li>• Size positions based on confidence</li>
                  <li>• Use smaller sizes when learning</li>
                  <li>• Adjust sizes based on bankroll</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Tools and Resources</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Self-Assessment Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Ask yourself these questions regularly:</p>
              <ul className="space-y-2 text-sm">
                <li>• Am I trading within my predetermined limits?</li>
                <li>• Do I feel in control of my trading decisions?</li>
                <li>• Am I trading for the right reasons?</li>
                <li>• Is trading negatively affecting other areas of my life?</li>
                <li>• Can I easily stop trading when I want to?</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded text-sm">
                <strong>If you answered "no" to any of these questions, consider taking a break from trading.</strong>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Getting Help</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">If you're struggling with gambling problems, help is available:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>National Problem Gambling Helpline:</strong> 1-800-522-4700
                </li>
                <li>
                  • <strong>Gamblers Anonymous:</strong> ga.org
                </li>
                <li>
                  • <strong>National Council on Problem Gambling:</strong> ncpgambling.org
                </li>
                <li>
                  • <strong>Crisis Text Line:</strong> Text HOME to 741741
                </li>
              </ul>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Making Trading Enjoyable</h2>

          <p className="mb-6">
            Responsible wagering isn't just about avoiding problems - it's about making prediction market trading a fun,
            educational, and sustainable hobby.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Focus on Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Treat each trade as a learning opportunity</li>
                  <li>• Study market dynamics and probability</li>
                  <li>• Keep detailed records for analysis</li>
                  <li>• Celebrate improved decision-making</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Social Aspects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Discuss markets with friends</li>
                  <li>• Join prediction market communities</li>
                  <li>• Share insights and strategies</li>
                  <li>• Learn from other traders</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Ready to Trade Responsibly?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Remember: the goal is to have fun while learning about markets and probability. Set your limits, stick
                to them, and enjoy the experience!
              </p>
              <Button size="lg" asChild>
                <Link href="/go/pm" className="inline-flex items-center gap-2">
                  Start Trading Responsibly <ExternalLink className="h-4 w-4" />
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
                <h4 className="font-semibold mb-2">How Odds Work</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Understand implied probability and how to read market prices.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/guides/how-odds-work">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
