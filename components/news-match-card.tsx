import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import type { NewsMatch } from "@/types"

interface NewsMatchCardProps {
  match: NewsMatch
}

export function NewsMatchCard({ match }: NewsMatchCardProps) {
  const { news, matches } = match
  const topMatch = matches[0]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const formatPrice = (price: number) => {
    return `${Math.round(price * 100)}¢`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{news.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{news.source}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(news.pubDate)}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {Math.round(topMatch.score * 100)}% match
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {matches.slice(0, 2).map((match, index) => (
            <div key={match.market.id} className="border rounded-lg p-3 bg-muted/30">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-medium line-clamp-2 flex-1">{match.market.question}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {Math.round(match.score * 100)}%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {match.market.outcomes.map((outcome, i) => (
                    <div key={i} className="text-xs">
                      <span className="text-muted-foreground">{outcome.name}:</span>
                      <span className="font-medium ml-1">{formatPrice(outcome.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/market/${match.market.slug}`}>View</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/go/pm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Bet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {matches.length > 2 && (
            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                +{matches.length - 2} more matches
              </Button>
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t">
          <Button variant="ghost" size="sm" asChild className="w-full justify-start">
            <Link href={news.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-2" />
              Read full article
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
