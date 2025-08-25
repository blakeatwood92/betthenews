import { requireRole } from "@/lib/auth"
import { getAllUsers } from "@/lib/auth"
import UserList from "@/components/cms/user-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default async function UsersPage() {
  await requireRole(["admin"])
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage user accounts and permissions</p>
        </div>
        <Button asChild>
          <Link href="/cms/users/new">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add User
          </Link>
        </Button>
      </div>

      <UserList users={users} />
    </div>
  )
}
