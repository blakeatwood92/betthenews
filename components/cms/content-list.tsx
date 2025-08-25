import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EditIcon, EyeIcon } from "lucide-react"
import type { ContentPage } from "@/types"

interface ContentListProps {
  content: ContentPage[]
  showAuthor?: boolean
  compact?: boolean
}

export default function ContentList({ content, showAuthor = false, compact = false }: ContentListProps) {
  if (content.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">No content found</p>
            <Button asChild className="mt-4">
              <Link href="/cms/content/new">Create your first content</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {content.map((page) => (
        <Card key={page.id}>
          <CardHeader className={compact ? "pb-2" : ""}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  <Link href={`/cms/content/${page.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {page.title}
                  </Link>
                </h3>
                {page.excerpt && !compact && <p className="text-gray-600 dark:text-gray-400 mt-1">{page.excerpt}</p>}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {showAuthor && <span>by {page.authorName}</span>}
                  <span>Updated {formatDistanceToNow(page.updatedAt)} ago</span>
                  {page.category && <Badge variant="outline">{page.category}</Badge>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={page.status === "published" ? "default" : "secondary"}>{page.status}</Badge>
                {!compact && (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/cms/content/${page.id}/edit`}>
                        <EditIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                    {page.status === "published" && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/content/${page.slug}`} target="_blank">
                          <EyeIcon className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          {page.tags.length > 0 && !compact && (
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {page.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
