import { notFound } from "next/navigation"
import { requireAuth } from "@/lib/auth"
import { getContentPage } from "@/lib/content"
import ContentEditor from "@/components/cms/content-editor"

interface EditContentPageProps {
  params: { id: string }
}

export default async function EditContentPage({ params }: EditContentPageProps) {
  const session = await requireAuth()
  const content = await getContentPage(params.id)

  if (!content) {
    notFound()
  }

  // Check permissions - users can only edit their own content unless admin
  if (session.role !== "admin" && content.authorId !== session.userId) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Content</h1>
        <p className="text-gray-600 dark:text-gray-400">Make changes to your content</p>
      </div>

      <ContentEditor initialData={content} />
    </div>
  )
}
