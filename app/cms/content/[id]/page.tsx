import { notFound } from "next/navigation"
import { requireAuth } from "@/lib/auth"
import { getContentPage } from "@/lib/content"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { EditIcon, EyeIcon, ArrowLeftIcon } from "lucide-react"

interface ContentDetailPageProps {
  params: { id: string }
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const session = await requireAuth()
  const content = await getContentPage(params.id)

  if (!content) {
    notFound()
  }

  // Check permissions - users can only view their own content unless admin
  if (session.role !== "admin" && content.authorId !== session.userId) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/cms/content">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Content
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/cms/content/${content.id}/edit`}>
              <EditIcon className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          {content.status === "published" && (
            <Button asChild>
              <Link href={`/content/${content.slug}`} target="_blank">
                <EyeIcon className="w-4 h-4 mr-2" />
                View Live
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{content.title}</CardTitle>
              {content.excerpt && <p className="text-gray-600 dark:text-gray-400 mt-2">{content.excerpt}</p>}
            </div>
            <Badge variant={content.status === "published" ? "default" : "secondary"}>{content.status}</Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>By {content.authorName}</span>
            <span>Created {formatDistanceToNow(content.createdAt)} ago</span>
            <span>Updated {formatDistanceToNow(content.updatedAt)} ago</span>
            {content.publishedAt && <span>Published {formatDistanceToNow(content.publishedAt)} ago</span>}
            {content.category && <Badge variant="outline">{content.category}</Badge>}
          </div>

          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\n/g, "<br>") }} />
          </div>
        </CardContent>
      </Card>

      {(content.seoTitle || content.seoDescription) && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {content.seoTitle && (
              <div>
                <label className="text-sm font-medium">SEO Title</label>
                <p className="text-gray-600 dark:text-gray-400">{content.seoTitle}</p>
              </div>
            )}
            {content.seoDescription && (
              <div>
                <label className="text-sm font-medium">SEO Description</label>
                <p className="text-gray-600 dark:text-gray-400">{content.seoDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
