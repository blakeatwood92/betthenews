import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import type { PolymarketMarket } from "@/types"

interface MarketCardProps {
  market: PolymarketMarket
  showDescription?: boolean
}

export function MarketCard({ market, showDescription = false }: MarketCardProps) {
  const formatPrice = (price: number) => {
    return `${Math.round(price * 100)}¢`
  }

  const formatLiquidity = (liquidity: number) => {
    if (liquidity >= 1000000) return `$${(liquidity / 1000000).toFixed(1)}M`
    if (liquidity >= 1000) return `$${(liquidity / 1000).toFixed(0)}K`
    return `$${liquidity.toFixed(0)}`
  }

  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Ended"
    if (diffDays === 0) return "Ends today"
    if (diffDays === 1) return "Ends tomorrow"
    if (diffDays < 7) return `Ends in ${diffDays}d`
    return `Ends ${date.toLocaleDateString()}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-tight line-clamp-2 flex-1">{market.question}</CardTitle>
          <div className="flex flex-col gap-1">
            {market.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {showDescription && market.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{market.description}</p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Outcomes */}
          <div className="flex justify-between items-center">
            {market.outcomes.map((outcome, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{outcome.name}</div>
                <div className="text-lg font-bold">{formatPrice(outcome.price)}</div>
              </div>
            ))}
          </div>

          {/* Market Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {formatLiquidity(market.liquidity_num)} liquidity
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatEndDate(market.end_date_iso)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
              <Link href={`/market/${market.slug}`}>View Details</Link>
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link href="/go/pm">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trade
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
