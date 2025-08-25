"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { MarketFilters, PolymarketEvent } from "@/types"

interface FiltersBarProps {
  filters: MarketFilters
  onFiltersChange: (filters: MarketFilters) => void
  events?: PolymarketEvent[]
}

export function FiltersBar({ filters, onFiltersChange, events = [] }: FiltersBarProps) {
  const [search, setSearch] = useState(filters.search || "")
  const [minLiquidity, setMinLiquidity] = useState([filters.minLiquidity || 1000])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: search || undefined })
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const handleLiquidityChange = (value: number[]) => {
    setMinLiquidity(value)
    onFiltersChange({ ...filters, minLiquidity: value[0] })
  }

  const clearFilters = () => {
    setSearch("")
    setMinLiquidity([1000])
    onFiltersChange({
      order: "liquidity",
      ascending: false,
      active: true,
      limit: 24,
      offset: 0,
    })
  }

  const hasActiveFilters = search || filters.category || (filters.minLiquidity && filters.minLiquidity > 1000)

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category */}
        <Select
          value={filters.category || "all"}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value || undefined })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.slug}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.order || "liquidity"}
          onValueChange={(value) => onFiltersChange({ ...filters, order: value as any })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="liquidity">Liquidity (High to Low)</SelectItem>
            <SelectItem value="volume">Volume (High to Low)</SelectItem>
            <SelectItem value="endDate">End Date (Soonest)</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          value={filters.active === false ? "closed" : "open"}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              active: value === "open",
              closed: value === "closed",
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open Markets</SelectItem>
            <SelectItem value="closed">Closed Markets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liquidity Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Min Liquidity</label>
          <Badge variant="secondary">${minLiquidity[0].toLocaleString()}</Badge>
        </div>
        <Slider
          value={minLiquidity}
          onValueChange={handleLiquidityChange}
          max={100000}
          min={1000}
          step={1000}
          className="w-full"
        />
      </div>
    </div>
  )
}
