import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import LoginForm from "@/components/cms/login-form"

export default async function LoginPage() {
  let session = null

  try {
    session = await getSession()
  } catch (error) {
    console.error("Session error:", error)
    // Continue without session check if there's an error
  }

  if (session) {
    redirect("/cms/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">Sign in to CMS</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Access the BetTheNews content management system
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
