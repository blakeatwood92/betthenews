export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-lg text-muted-foreground mb-8">
          If you can see this page, the basic Next.js routing is working.
        </p>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Site Navigation</h2>
            <p className="text-muted-foreground mb-4">Test the main site pages:</p>
            <div className="space-x-2">
              <a
                href="/"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Homepage
              </a>
              <a
                href="/content"
                className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
              >
                Content
              </a>
              <a
                href="/markets"
                className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
              >
                Markets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
