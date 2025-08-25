import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
  createdAt: Date
}

export interface Session {
  userId: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
}

// Simple in-memory user store (replace with database in production)
const users: Map<string, User & { password: string }> = new Map()

// Initialize admin user
const adminId = "admin-1"
const hashedPassword = bcrypt.hashSync("admin123", 10)
users.set(adminId, {
  id: adminId,
  email: "admin@betthenews.com",
  name: "Admin User",
  role: "admin",
  password: hashedPassword,
  createdAt: new Date(),
})

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "editor" | "viewer" = "editor",
): Promise<User> {
  const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const hashedPassword = bcrypt.hashSync(password, 10)

  const user: User & { password: string } = {
    id,
    email,
    name,
    role,
    password: hashedPassword,
    createdAt: new Date(),
  }

  users.set(id, user)

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  for (const user of users.values()) {
    if (user.email === email && bcrypt.compareSync(password, user.password)) {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    }
  }
  return null
}

export async function createSession(user: User): Promise<void> {
  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }

  const cookieStore = cookies()
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie?.value) {
      return null
    }

    const session: Session = JSON.parse(sessionCookie.value)
    return session
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("session")
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession()
  if (!session) {
    redirect("/cms/login")
  }
  return session
}

export async function requireRole(allowedRoles: ("admin" | "editor" | "viewer")[]): Promise<Session> {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.role)) {
    redirect("/cms/unauthorized")
  }
  return session
}

export async function getAllUsers(): Promise<User[]> {
  return Array.from(users.values())
    .map((user) => {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getUserById(id: string): Promise<User | null> {
  const user = users.get(id)
  if (!user) return null

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function updateUser(
  id: string,
  updates: Partial<Pick<User, "name" | "email" | "role">>,
): Promise<User | null> {
  const user = users.get(id)
  if (!user) return null

  const updatedUser = { ...user, ...updates }
  users.set(id, updatedUser)

  const { password: _, ...userWithoutPassword } = updatedUser
  return userWithoutPassword
}

export async function deleteUser(id: string): Promise<boolean> {
  return users.delete(id)
}

export async function updatePassword(id: string, newPassword: string): Promise<boolean> {
  const user = users.get(id)
  if (!user) return false

  const hashedPassword = bcrypt.hashSync(newPassword, 10)
  users.set(id, { ...user, password: hashedPassword })
  return true
}

export async function checkEmailExists(email: string, excludeId?: string): Promise<boolean> {
  for (const [id, user] of users.entries()) {
    if (user.email === email && id !== excludeId) {
      return true
    }
  }
  return false
}
