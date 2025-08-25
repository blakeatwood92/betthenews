import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldXIcon } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <ShieldXIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this resource. Please contact your administrator if you believe this is
            an error.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/cms/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/cms/login">Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
