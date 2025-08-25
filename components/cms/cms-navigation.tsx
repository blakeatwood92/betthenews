"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HomeIcon, FileTextIcon, UsersIcon, LogOutIcon, PlusIcon } from "lucide-react"
import type { Session } from "@/types"

interface CMSNavigationProps {
  session: Session
}

export default function CMSNavigation({ session }: CMSNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/cms/login")
    router.refresh()
  }

  const navItems = [
    { href: "/cms/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/cms/content", label: "Content", icon: FileTextIcon },
  ]

  if (session.role === "admin") {
    navItems.push({ href: "/cms/users", label: "Users", icon: UsersIcon })
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/cms/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
              BetTheNews CMS
            </Link>

            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild size="sm">
              <Link href="/cms/content/new">
                <PlusIcon className="w-4 h-4 mr-2" />
                New Content
              </Link>
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {session.name} ({session.role})
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
