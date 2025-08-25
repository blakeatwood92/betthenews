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
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 bg-muted animate-pulse rounded w-80" />
            <div className="h-6 bg-muted animate-pulse rounded w-20" />
          </div>
          <div className="h-4 bg-muted animate-pulse rounded w-96" />
        </div>

        {/* Market Moves Section Skeleton */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 bg-muted animate-pulse rounded w-64" />
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-xl loading-shimmer" />
            ))}
          </div>
        </section>

        {/* Breaking News Section Skeleton */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 bg-muted animate-pulse rounded w-48" />
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-xl loading-shimmer" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
