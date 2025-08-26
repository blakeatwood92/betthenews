import type { ContentPage, ContentPageInput, Session, Category } from "@/types"

// Simple in-memory content store (replace with database in production)
const contentPages: Map<string, ContentPage> = new Map()

export async function createContentPage(input: ContentPageInput, author: Session): Promise<ContentPage> {
  const id = `content-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const slug = generateSlug(input.title)
  const now = new Date()

  const readingTime = calculateReadingTime(input.content)

  const contentPage: ContentPage = {
    id,
    slug,
    title: input.title,
    content: input.content,
    excerpt: input.excerpt,
    status: input.status,
    authorId: author.userId,
    authorName: author.name,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : undefined,
    tags: input.tags,
    category: input.category,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    polymarketUrl: input.polymarketUrl,
    polymarketId: input.polymarketId,
    featuredImage: input.featuredImage,
    readingTime,
  }

  contentPages.set(id, contentPage)
  return contentPage
}

export async function updateContentPage(
  id: string,
  input: Partial<ContentPageInput>,
  author: Session,
): Promise<ContentPage | null> {
  const existing = contentPages.get(id)
  if (!existing) return null

  // Check permissions - only author or admin can edit
  if (existing.authorId !== author.userId && author.role !== "admin") {
    throw new Error("Unauthorized to edit this content")
  }

  const readingTime = input.content ? calculateReadingTime(input.content) : existing.readingTime

  const updated: ContentPage = {
    ...existing,
    ...input,
    updatedAt: new Date(),
    publishedAt: input.status === "published" && !existing.publishedAt ? new Date() : existing.publishedAt,
    readingTime,
  }

  if (input.title) {
    updated.slug = generateSlug(input.title)
  }

  contentPages.set(id, updated)
  return updated
}

export async function getContentPage(id: string): Promise<ContentPage | null> {
  return contentPages.get(id) || null
}

export async function getContentPageBySlug(slug: string): Promise<ContentPage | null> {
  for (const page of contentPages.values()) {
    if (page.slug === slug) return page
  }
  return null
}

export async function getAllContentPages(status?: "draft" | "published" | "archived"): Promise<ContentPage[]> {
  const pages = Array.from(contentPages.values())

  if (status) {
    return pages.filter((page) => page.status === status)
  }

  return pages.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

export async function getContentPagesByAuthor(authorId: string): Promise<ContentPage[]> {
  return Array.from(contentPages.values())
    .filter((page) => page.authorId === authorId)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

export async function getContentPagesByCategory(category: Category): Promise<ContentPage[]> {
  return Array.from(contentPages.values())
    .filter((page) => page.category === category && page.status === "published")
    .sort((a, b) => b.publishedAt!.getTime() - a.publishedAt!.getTime())
}

export async function deleteContentPage(id: string, author: Session): Promise<boolean> {
  const existing = contentPages.get(id)
  if (!existing) return false

  // Check permissions - only author or admin can delete
  if (existing.authorId !== author.userId && author.role !== "admin") {
    throw new Error("Unauthorized to delete this content")
  }

  return contentPages.delete(id)
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
