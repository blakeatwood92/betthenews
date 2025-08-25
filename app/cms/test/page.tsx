export default function CMSTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CMS Test Page</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">If you can see this page, the CMS routing is working.</p>
          <div className="mt-6 space-y-4">
            <a
              href="/cms/login"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              Go to CMS Login
            </a>
            <a href="/" className="block w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 text-center">
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
