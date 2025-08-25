import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EditIcon, TrashIcon, UserIcon } from "lucide-react"
import type { User } from "@/types"

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "editor":
        return "default"
      case "viewer":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No users found</p>
            <Button asChild className="mt-4">
              <Link href="/cms/users/new">Add your first user</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined {formatDistanceToNow(user.createdAt)} ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/cms/users/${user.id}/edit`}>
                      <EditIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                  {user.role !== "admin" && (
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
