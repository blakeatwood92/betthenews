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

export async function initializeDefaultContent() {
  // Create a default admin session for content creation
  const adminSession = {
    userId: "admin-1",
    name: "Admin",
    email: "admin@polymarketlive.com",
    role: "admin" as const,
  }

  // Add the Russia-Ukraine ceasefire article
  const ukraineArticle: ContentPageInput = {
    title: "Polymarket Traders Slash Odds of Russia–Ukraine Ceasefire Before October to Just 7%",
    content: `On prediction platform Polymarket, traders are signaling near-unanimous skepticism that Russia and Ukraine will reach a ceasefire agreement before October 2025.

As of August 30, the market "Russia x Ukraine ceasefire before October?" is pricing just a 7% chance that a truce will be declared in the next month. That's down more than 30 percentage points in recent weeks, reflecting waning optimism amid ongoing fighting and stalled diplomatic efforts.

The market has seen nearly $7 million in trading volume, making it one of Polymarket's most heavily traded geopolitical questions this year. Traders can currently buy "Yes" shares for 7¢ or "No" shares for 94¢, effectively betting on the likelihood of peace talks delivering concrete results.

The decline comes despite periodic speculation about back-channel negotiations. Recent military escalations and hardened rhetoric from both Moscow and Kyiv appear to have fueled pessimism among bettors.

Prediction markets like Polymarket aggregate crowd sentiment into tradable odds, giving observers a real-time view of public expectations. In this case, the overwhelming consensus is that no ceasefire will be reached before October 1, 2025.`,
    excerpt:
      "Polymarket traders give just a 7% chance of a Russia–Ukraine ceasefire before October 2025, with nearly $7M already wagered.",
    status: "published",
    category: "politics",
    tags: [
      "Polymarket",
      "prediction markets",
      "Russia Ukraine war",
      "ceasefire",
      "geopolitics",
      "betting odds",
      "2025 Ukraine conflict",
    ],
    seoTitle: "Polymarket Traders Slash Odds of Russia–Ukraine Ceasefire Before October to Just 7%",
    seoDescription:
      "Polymarket traders give just a 7% chance of a Russia–Ukraine ceasefire before October 2025, with nearly $7M already wagered.",
    polymarketUrl: "https://polymarket.com/event/russia-x-ukraine-ceasefire-before-october",
    polymarketId: "russia-ukraine-ceasefire-oct-2025",
  }

  await createContentPage(ukraineArticle, adminSession)

  const putinZelenskyyArticle: ContentPageInput = {
    title: "Polymarket Bets: Will Putin and Zelenskyy Meet in 2025? Traders Lean Heavily No",
    content: `A potential face-to-face meeting between Russian President Vladimir Putin and Ukrainian President Volodymyr Zelenskyy has become the focus of speculation on prediction platform Polymarket.

The market, titled "Will Putin meet with Zelenskyy in 2025?", has drawn steady trading volume as bettors assess whether the war-time adversaries will agree to direct talks this year. So far, sentiment is skeptical. Traders currently price the probability of a meeting at low double-digit odds, signaling doubt that diplomacy will thaw enough for the two leaders to sit down before year's end.

While intermediaries and global actors have periodically pushed for negotiations, both Moscow and Kyiv have publicly maintained hardline stances. Previous attempts at high-level talks collapsed early in the war, and no official roadmap for a 2025 meeting has surfaced.

Still, prediction market watchers note that geopolitical shocks can move prices dramatically. Any credible reports of summit planning could spark sharp swings in odds — just as ceasefire markets have shifted after military or diplomatic headlines.

For now, however, the Polymarket crowd believes the status quo of stalemate and indirect communication will continue through 2025.`,
    excerpt:
      "Polymarket traders doubt Putin and Zelenskyy will meet in 2025, pricing the chances at low odds despite global calls for negotiations.",
    status: "published",
    category: "politics",
    tags: [
      "Polymarket",
      "Putin",
      "Zelenskyy",
      "Ukraine Russia war",
      "diplomacy",
      "geopolitics",
      "betting markets",
      "2025 predictions",
    ],
    seoTitle: "Polymarket Bets: Will Putin and Zelenskyy Meet in 2025? Traders Lean Heavily No",
    seoDescription:
      "Polymarket traders doubt Putin and Zelenskyy will meet in 2025, pricing the chances at low odds despite global calls for negotiations.",
    polymarketUrl: "https://polymarket.com/event/will-putin-meet-with-zelenskyy-in-2025",
    polymarketId: "putin-zelenskyy-meeting-2025",
  }

  await createContentPage(putinZelenskyyArticle, adminSession)

  const taylorSwiftArticle: ContentPageInput = {
    title: "Polymarket Traders Speculate: Is Taylor Swift Pregnant in 2025?",
    content: `Pop superstar Taylor Swift has become the subject of yet another Polymarket betting frenzy — this time over whether she'll announce a pregnancy in 2025.

The market, titled "Taylor Swift pregnant in 2025?", has drawn in thousands of dollars in volume as fans, speculators, and traders alike wager on the possibility of one of the world's most famous artists sharing personal news.

Polymarket's odds currently tilt heavily toward "No", reflecting the crowd's belief that Swift — in the middle of her massively successful Eras Tour and ongoing business ventures — is unlikely to step back for family life in the near term. However, as with most celebrity markets, sentiment can shift rapidly with any tabloid headline, paparazzi photo, or public appearance.

This market highlights the expanding scope of prediction platforms, where topics range from high-stakes geopolitics to celebrity rumors. While Polymarket provides no guarantee of truth, it offers a fascinating look into what the crowd believes could happen next in pop culture.`,
    excerpt:
      "Polymarket traders are betting on whether Taylor Swift will be pregnant in 2025, with odds strongly leaning 'No.'",
    status: "published",
    category: "entertainment",
    tags: [
      "Taylor Swift",
      "Polymarket",
      "celebrity rumors",
      "entertainment news",
      "prediction markets",
      "2025 speculation",
    ],
    seoTitle: "Polymarket Traders Speculate: Is Taylor Swift Pregnant in 2025?",
    seoDescription:
      "Polymarket traders are betting on whether Taylor Swift will be pregnant in 2025, with odds strongly leaning 'No.'",
    polymarketUrl: "https://polymarket.com/event/taylor-swift-pregnant-in-2025",
    polymarketId: "taylor-swift-pregnant-2025",
  }

  await createContentPage(taylorSwiftArticle, adminSession)
}

// Initialize default content when the module loads
initializeDefaultContent().catch(console.error)
