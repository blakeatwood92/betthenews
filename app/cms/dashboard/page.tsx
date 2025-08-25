import { requireAuth } from "@/lib/auth"
import { getAllContentPages } from "@/lib/content"
import DashboardStats from "@/components/cms/dashboard-stats"
import ContentList from "@/components/cms/content-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default async function DashboardPage() {
  const session = await requireAuth()
  const allContent = await getAllContentPages()
  const userContent = allContent.filter((page) => page.authorId === session.userId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {session.name}</p>
        </div>
        <Button asChild>
          <Link href="/cms/content/new">
            <PlusIcon className="w-4 h-4 mr-2" />
            New Content
          </Link>
        </Button>
      </div>

      <DashboardStats
        totalContent={allContent.length}
        userContent={userContent.length}
        publishedContent={allContent.filter((p) => p.status === "published").length}
        draftContent={allContent.filter((p) => p.status === "draft").length}
        userRole={session.role}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Recent Content</h2>
          <ContentList content={userContent.slice(0, 5)} showAuthor={false} compact={true} />
          {userContent.length > 5 && (
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/cms/content">View All Your Content</Link>
              </Button>
            </div>
          )}
        </div>

        {session.role === "admin" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">All Recent Content</h2>
            <ContentList content={allContent.slice(0, 5)} showAuthor={true} compact={true} />
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/cms/content">Manage All Content</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
