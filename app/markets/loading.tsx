import { BarChart3 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Polymarket Live</span>
            </div>
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-muted animate-pulse rounded mb-2 w-48" />
          <div className="h-4 bg-muted animate-pulse rounded w-96" />
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-muted animate-pulse rounded w-20" />
            <div className="h-8 bg-muted animate-pulse rounded w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-muted animate-pulse rounded" />
            ))}
          </div>
          <div className="h-16 bg-muted animate-pulse rounded" />
        </div>

        {/* Results Summary Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 bg-muted animate-pulse rounded w-32" />
          <div className="h-4 bg-muted animate-pulse rounded w-24" />
        </div>

        {/* Markets Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl loading-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}
