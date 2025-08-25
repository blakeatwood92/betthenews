"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { OddsCard } from "@/components/odds-card"
import { FiltersBar } from "@/components/filters-bar"
import { useMarkets, useEvents } from "@/lib/polymarket-client"
import { config } from "@/lib/config"
import type { MarketFilters } from "@/types"

const ITEMS_PER_PAGE = 24

export default function MarketsPage() {
  const [filters, setFilters] = useState<MarketFilters>({
    order: "liquidity",
    ascending: false,
    active: true,
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })

  const [currentPage, setCurrentPage] = useState(1)

  const { markets, isLoading, isError } = useMarkets(filters)
  const { events } = useEvents()

  const handleFiltersChange = (newFilters: MarketFilters) => {
    setFilters({ ...newFilters, limit: ITEMS_PER_PAGE, offset: 0 })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setFilters({ ...filters, offset: (page - 1) * ITEMS_PER_PAGE })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const totalPages = Math.ceil((markets.length || 0) / ITEMS_PER_PAGE)
  const hasNextPage = markets.length === ITEMS_PER_PAGE // If we got full page, there might be more

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Polymarket Live</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/breaking" className="text-sm hover:text-primary transition-colors">
                Breaking
              </Link>
            </nav>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
                Start Trading
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Markets</h1>
          <p className="text-muted-foreground">
            Explore prediction markets with real-time odds, volume, and liquidity data. Updated every 20 seconds.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FiltersBar filters={filters} onFiltersChange={handleFiltersChange} events={events} />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                "Loading markets..."
              ) : isError ? (
                "Error loading markets"
              ) : (
                <>
                  Showing {markets.length} markets
                  {filters.search && ` for "${filters.search}"`}
                  {filters.category && ` in ${filters.category}`}
                </>
              )}
            </div>
            {!isLoading && !isError && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Page {currentPage} {hasNextPage && `of ${currentPage}+`}
          </div>
        </div>

        {/* Markets Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl loading-shimmer" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Failed to load markets</h3>
            <p className="text-muted-foreground mb-4">There was an error loading market data. Please try again.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : markets.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No markets found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more markets.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                handleFiltersChange({
                  order: "liquidity",
                  ascending: false,
                  active: true,
                  limit: ITEMS_PER_PAGE,
                  offset: 0,
                })
              }
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {markets.map((market) => (
                <OddsCard key={market.id} market={market} />
              ))}
            </div>

            {/* Pagination */}
            {(currentPage > 1 || hasNextPage) && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {currentPage > 2 && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => handlePageChange(1)}>
                        1
                      </Button>
                      {currentPage > 3 && <span className="text-muted-foreground">...</span>}
                    </>
                  )}

                  {currentPage > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage - 1)}>
                      {currentPage - 1}
                    </Button>
                  )}

                  <Button variant="default" size="sm" disabled>
                    {currentPage}
                  </Button>

                  {hasNextPage && (
                    <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage + 1)}>
                      {currentPage + 1}
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  className="bg-transparent"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center py-12 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Polymarket and trade on real-world events with the world's largest prediction market platform.
          </p>
          <Button size="lg" asChild className="hover:scale-105 transition-transform">
            <Link href={config.affiliate.url} target="_blank" rel="noopener noreferrer">
              Start Trading on Polymarket
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
