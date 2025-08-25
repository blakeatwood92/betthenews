"use client"
import { OddsCard } from "./odds-card"
import { BreakingItem } from "./breaking-item"
import { useMarkets, useBreaking } from "@/lib/polymarket-client"
import { Badge } from "./ui/badge"
import { Clock, TrendingUp, BarChart3 } from "lucide-react"

interface LiveMarketsClientProps {
  initialMarkets: any[]
  initialBreaking: any[]
}

export function LiveMarketsClient({ initialMarkets, initialBreaking }: LiveMarketsClientProps) {
  const { markets, mutate: mutateMarkets } = useMarkets({
    order: "liquidity",
    ascending: false,
    limit: 12,
    active: true,
  })

  const { breaking, mutate: mutateBreaking } = useBreaking()

  // Use server data initially, then switch to client polling
  const displayMarkets = markets.length > 0 ? markets : initialMarkets
  const displayBreaking = breaking.length > 0 ? breaking : initialBreaking

  return (
    <>
      {/* Trending Markets Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Trending Markets</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Live
              </Badge>
            </div>
          </div>

          {displayMarkets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayMarkets.slice(0, 12).map((market: any) => (
                <OddsCard key={market.id} market={market} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Loading trending markets...</p>
            </div>
          )}
        </div>
      </section>

      {/* Breaking Moves Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Breaking Moves (24h)</h2>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Hot
              </Badge>
            </div>
          </div>

          {displayBreaking.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayBreaking.slice(0, 12).map((item: any, index: number) => (
                <BreakingItem key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Loading breaking news...</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
