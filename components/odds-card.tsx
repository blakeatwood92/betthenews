import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ExternalLink, Wifi, WifiOff } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import { usePolymarketWS } from "@/hooks/use-polymarket-ws"
import type { PolymarketMarketNormalized } from "@/types"

interface OddsCardProps {
  market: PolymarketMarketNormalized
}

export function OddsCard({ market }: OddsCardProps) {
  const { prices, isConnected, isEnabled } = usePolymarketWS(market.id)

  // Use WebSocket prices if available, otherwise fall back to market data
  const yesPrice = prices.yesPrice ?? market.yesPrice
  const noPrice = prices.noPrice ?? market.noPrice

  const yesPercentage = Math.round(yesPrice * 100)
  const noPercentage = Math.round(noPrice * 100)

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2">{market.title}</CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />${Math.round(market.liquidity / 1000)}K
            </Badge>
            {isEnabled && (
              <Badge variant={isConnected ? "default" : "secondary"} className="text-xs p-1">
                {isConnected ? (
                  <Wifi className="w-3 h-3 text-green-500" />
                ) : (
                  <WifiOff className="w-3 h-3 text-muted-foreground" />
                )}
              </Badge>
            )}
          </div>
        </div>
        {market.eventTitle && <p className="text-xs text-muted-foreground line-clamp-1">{market.eventTitle}</p>}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Price Bar Visual */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-green-600 font-medium">YES {yesPercentage}¢</span>
            <span className="text-red-600 font-medium">NO {noPercentage}¢</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${yesPercentage}%` }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent" asChild>
            <Link href={market.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              View Market
            </Link>
          </Button>
          <Button size="sm" className="flex-1 text-xs bg-primary hover:bg-primary/90" asChild>
            <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
              Bet Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
