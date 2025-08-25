import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import type { BreakingItem as BreakingItemType } from "@/types"

interface BreakingItemProps {
  item: BreakingItemType
}

export function BreakingItem({ item }: BreakingItemProps) {
  const isPolymarketItem = item.yes !== undefined && item.delta !== undefined

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-2">{item.title}</h3>

            {isPolymarketItem ? (
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {Math.round((item.yes || 0) * 100)}% YES
                </Badge>
                {item.delta !== undefined && (
                  <div
                    className={`flex items-center text-xs ${
                      item.delta > 0 ? "text-green-600" : item.delta < 0 ? "text-red-600" : "text-muted-foreground"
                    }`}
                  >
                    {item.delta > 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : item.delta < 0 ? (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    ) : null}
                    {item.delta > 0 ? "+" : ""}
                    {Math.round(item.delta * 100)}%
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {item.source}
                </Badge>
                {item.published && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(item.published).toLocaleDateString()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent" asChild>
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              {isPolymarketItem ? "View Market" : "Read Article"}
            </Link>
          </Button>
          {isPolymarketItem && (
            <Button size="sm" className="flex-1 text-xs bg-primary hover:bg-primary/90" asChild>
              <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                Bet Now
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
