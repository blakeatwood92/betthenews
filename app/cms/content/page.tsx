import { requireAuth } from "@/lib/auth"
import { getAllContentPages } from "@/lib/content"
import ContentList from "@/components/cms/content-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { PlusIcon, SearchIcon } from "lucide-react"

interface ContentPageProps {
  searchParams: { status?: string; search?: string }
}

export default async function ContentPage({ searchParams }: ContentPageProps) {
  const session = await requireAuth()
  let content = await getAllContentPages()

  // Filter by status if specified
  if (searchParams.status && searchParams.status !== "all") {
    content = content.filter((page) => page.status === searchParams.status)
  }

  // Filter by search term if specified
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase()
    content = content.filter(
      (page) =>
        page.title.toLowerCase().includes(searchTerm) ||
        page.content.toLowerCase().includes(searchTerm) ||
        page.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  // Filter by user role - editors only see their own content unless admin
  if (session.role !== "admin") {
    content = content.filter((page) => page.authorId === session.userId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {session.role === "admin" ? "Manage all content" : "Manage your content"}
          </p>
        </div>
        <Button asChild>
          <Link href="/cms/content/new">
            <PlusIcon className="w-4 h-4 mr-2" />
            New Content
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search content..." defaultValue={searchParams.search} className="pl-10" name="search" />
          </div>
        </div>
        <Select defaultValue={searchParams.status || "all"}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ContentList content={content} showAuthor={session.role === "admin"} />
    </div>
  )
}
