import type React from "react"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import CMSNavigation from "@/components/cms/cms-navigation"

export default async function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isLoginPage = typeof window === "undefined" && (global as any).__NEXT_PRIVATE_PATHNAME?.includes("/cms/login")

  let session = null

  if (!isLoginPage) {
    session = await getSession()
    if (!session) {
      redirect("/cms/login")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {session && <CMSNavigation session={session} />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
