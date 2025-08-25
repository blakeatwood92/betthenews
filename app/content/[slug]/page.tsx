import { notFound } from "next/navigation"
import { getContentPageBySlug, getAllContentPages } from "@/lib/content"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, CalendarIcon, UserIcon, ArrowLeftIcon, ShareIcon } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Metadata } from "next"

interface ContentDetailPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ContentDetailPageProps): Promise<Metadata> {
  const content = await getContentPageBySlug(params.slug)

  if (!content) {
    return {
      title: "Content Not Found - BetTheNews",
    }
  }

  return {
    title: content.seoTitle || `${content.title} - BetTheNews`,
    description: content.seoDescription || content.excerpt || content.title,
    openGraph: {
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.excerpt || content.title,
      type: "article",
      publishedTime: content.publishedAt?.toISOString(),
      authors: [content.authorName],
      tags: content.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle || content.title,
      description: content.seoDescription || content.excerpt || content.title,
    },
  }
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const content = await getContentPageBySlug(params.slug)

  if (!content || content.status !== "published") {
    notFound()
  }

  // Get related content
  const allContent = await getAllContentPages("published")
  const relatedContent = allContent
    .filter((page) => page.id !== content.id && page.category === content.category)
    .slice(0, 3)

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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/content">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Content
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          {content.category && (
            <Badge variant="outline" className="mb-4">
              {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content.title}</h1>
          {content.excerpt && <p className="text-xl text-muted-foreground mb-6">{content.excerpt}</p>}

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>{content.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDistanceToNow(content.publishedAt || content.createdAt)} ago</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ShareIcon className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {content.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="prose dark:prose-invert max-w-none prose-lg">
              <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\n/g, "<br>") }} />
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mb-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to put your knowledge to work?</h3>
            <p className="text-muted-foreground mb-6">
              Turn your insights into profits with prediction markets on Polymarket.
            </p>
            <Button size="lg" asChild className="hover:scale-105 transition-transform">
              <Link href="/go/pm">Start Betting with $10 Bonus</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Related Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedContent.map((page) => (
                <Card key={page.id} className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <h4 className="font-semibold leading-tight">
                      <Link href={`/content/${page.slug}`} className="hover:text-primary transition-colors">
                        {page.title}
                      </Link>
                    </h4>
                    {page.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{page.excerpt}</p>}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{page.authorName}</span>
                      <span>{formatDistanceToNow(page.publishedAt || page.createdAt)} ago</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
