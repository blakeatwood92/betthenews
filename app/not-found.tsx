import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Home, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const popularTopics = ["Politics", "Economy", "World", "Tech", "Sports"]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-3xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist. But don't worry - there's plenty to explore!
            </p>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for news, markets, or topics..." className="pl-10" />
            </div>

            {/* Popular Topics */}
            <div>
              <h3 className="font-semibold mb-3">Popular Topics</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {popularTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="cursor-pointer" asChild>
                    <Link href={`/topic/${topic.toLowerCase()}`}>{topic}</Link>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Navigation Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/news-to-bets">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Browse News → Bets
                </Link>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Looking for something specific?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Let us know
                </Link>{" "}
                and we'll help you find it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
