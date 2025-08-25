import { getAllContentPages } from "@/lib/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, SearchIcon, CalendarIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { CATEGORIES } from "@/types"

interface ContentPageProps {
  searchParams: { category?: string; search?: string }
}

export default async function ContentPage({ searchParams }: ContentPageProps) {
  let content = await getAllContentPages("published")

  // Filter by category if specified
  if (searchParams.category && searchParams.category !== "all") {
    content = content.filter((page) => page.category === searchParams.category)
  }

  // Filter by search term if specified
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase()
    content = content.filter(
      (page) =>
        page.title.toLowerCase().includes(searchTerm) ||
        page.excerpt?.toLowerCase().includes(searchTerm) ||
        page.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
                BetTheNews
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/news-to-bets" className="text-sm hover:text-primary transition-colors">
                News → Bets
              </Link>
              <Link href="/markets" className="text-sm hover:text-primary transition-colors">
                Markets
              </Link>
              <Link href="/content" className="text-sm text-primary font-medium">
                Content
              </Link>
              <Link href="/guides" className="text-sm hover:text-primary transition-colors">
                Guides
              </Link>
            </nav>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link href="/go/pm">Start Betting</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Content & Insights</h1>
          <p className="text-xl text-muted-foreground">
            Expert analysis, market insights, and educational content about prediction markets and current events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search content..."
                defaultValue={searchParams.search}
                className="pl-10"
                name="search"
              />
            </div>
          </div>
          <Select defaultValue={searchParams.category || "all"}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Grid */}
        {content.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No content found</p>
                <Button asChild>
                  <Link href="/content">View All Content</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((page) => (
              <Card key={page.id} className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      {page.category && (
                        <Badge variant="outline" className="mb-2">
                          {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
                        </Badge>
                      )}
                      <CardTitle className="text-lg leading-tight">
                        <Link
                          href={`/content/${page.slug}`}
                          className="hover:text-primary transition-colors line-clamp-2"
                        >
                          {page.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                  {page.excerpt && <p className="text-muted-foreground text-sm line-clamp-3">{page.excerpt}</p>}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{page.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDistanceToNow(page.publishedAt || page.createdAt)} ago</span>
                    </div>
                  </div>

                  {page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {page.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {page.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{page.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button asChild className="w-full">
                    <Link href={`/content/${page.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold">BetTheNews</span>
              </div>
              <p className="text-sm text-muted-foreground">If it's in the news, it's on the board.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Markets</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/markets" className="hover:text-primary transition-colors">
                    All Markets
                  </Link>
                </li>
                <li>
                  <Link href="/topic/politics" className="hover:text-primary transition-colors">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="/topic/economy" className="hover:text-primary transition-colors">
                    Economy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Learn</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/guides" className="hover:text-primary transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/content" className="hover:text-primary transition-colors">
                    Content & Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/legal" className="hover:text-primary transition-colors">
                    Terms & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              BetTheNews is an independent information and affiliate website. We do not provide trading services or
              financial advice. 18+ only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
