import type React from "react"
import { requireAuth } from "@/lib/auth"
import CMSNavigation from "@/components/cms/cms-navigation"

export default async function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CMSNavigation session={session} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
