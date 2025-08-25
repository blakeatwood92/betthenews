import { requireRole } from "@/lib/auth"
import UserEditor from "@/components/cms/user-editor"

export default async function NewUserPage() {
  await requireRole(["admin"])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New User</h1>
        <p className="text-gray-600 dark:text-gray-400">Create a new user account with appropriate permissions</p>
      </div>

      <UserEditor />
    </div>
  )
}
