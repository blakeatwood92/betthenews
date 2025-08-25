export default function SimpleLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Simple CMS Login</h1>
          <p className="text-muted-foreground mt-2">This is a basic login page without complex authentication logic.</p>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="admin@betthenews.com"
              defaultValue="admin@betthenews.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="admin123"
              defaultValue="admin123"
            />
          </div>

          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Login (Static Form)
          </button>

          <div className="text-center text-sm text-muted-foreground">
            <p>This is a static form for testing purposes.</p>
            <p>Default credentials: admin@betthenews.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
