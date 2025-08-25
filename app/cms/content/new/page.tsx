import { requireRole } from "@/lib/auth"
import ContentEditor from "@/components/cms/content-editor"

export default async function NewContentPage() {
  await requireRole(["admin", "editor"])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Content</h1>
        <p className="text-gray-600 dark:text-gray-400">Write and publish new content for your audience</p>
      </div>

      <ContentEditor />
    </div>
  )
}
