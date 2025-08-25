export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="h-10 bg-muted animate-pulse rounded mb-4 max-w-md mx-auto" />
        <div className="h-6 bg-muted animate-pulse rounded mb-6 max-w-2xl mx-auto" />
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
