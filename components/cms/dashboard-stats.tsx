import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileTextIcon, EyeIcon, EditIcon, UsersIcon } from "lucide-react"

interface DashboardStatsProps {
  totalContent: number
  userContent: number
  publishedContent: number
  draftContent: number
  userRole: "admin" | "editor" | "viewer"
}

export default function DashboardStats({
  totalContent,
  userContent,
  publishedContent,
  draftContent,
  userRole,
}: DashboardStatsProps) {
  const stats = [
    {
      title: userRole === "admin" ? "Total Content" : "Your Content",
      value: userRole === "admin" ? totalContent : userContent,
      icon: FileTextIcon,
      description: userRole === "admin" ? "All content pages" : "Content you've created",
    },
    {
      title: "Published",
      value: publishedContent,
      icon: EyeIcon,
      description: "Live content pages",
    },
    {
      title: "Drafts",
      value: draftContent,
      icon: EditIcon,
      description: "Unpublished content",
    },
  ]

  if (userRole === "admin") {
    stats.push({
      title: "Contributors",
      value: "3", // This would come from user count in real implementation
      icon: UsersIcon,
      description: "Active content creators",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
