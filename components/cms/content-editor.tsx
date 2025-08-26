"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, ImageIcon, Clock } from "lucide-react"
import type { ContentPage, ContentPageInput } from "@/types"
import { CATEGORIES } from "@/types"

interface ContentEditorProps {
  initialData?: ContentPage
}

export default function ContentEditor({ initialData }: ContentEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState<ContentPageInput>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    status: initialData?.status || "draft",
    tags: initialData?.tags || [],
    category: initialData?.category || "news",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    polymarketUrl: initialData?.polymarketUrl || "",
    polymarketId: initialData?.polymarketId || "",
    featuredImage: initialData?.featuredImage || "",
  })

  const [newTag, setNewTag] = useState("")

  const seoTitleLength = formData.seoTitle?.length || 0
  const seoDescLength = formData.seoDescription?.length || 0
  const excerptLength = formData.excerpt?.length || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const url = initialData ? `/api/content/${initialData.id}` : "/api/content"
      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/cms/content/${result.content.id}`)
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save content")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="Enter content title"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">
                  Excerpt <span className="text-sm text-gray-500">({excerptLength}/160 chars)</span>
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the content (recommended for SEO)"
                  rows={2}
                  maxLength={160}
                />
              </div>

              <div>
                <Label htmlFor="content">
                  Content *
                  <span className="text-sm text-gray-500 ml-2">
                    <Clock className="w-3 h-3 inline mr-1" />~{calculateReadingTime(formData.content)} min read
                  </span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  required
                  placeholder="Write your content here..."
                  rows={15}
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">
                  SEO Title{" "}
                  <span className={`text-sm ${seoTitleLength > 60 ? "text-red-500" : "text-gray-500"}`}>
                    ({seoTitleLength}/60 chars)
                  </span>
                </Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="SEO optimized title (leave empty to use main title)"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">Optimal length: 50-60 characters</p>
              </div>

              <div>
                <Label htmlFor="seoDescription">
                  SEO Description{" "}
                  <span className={`text-sm ${seoDescLength > 160 ? "text-red-500" : "text-gray-500"}`}>
                    ({seoDescLength}/160 chars)
                  </span>
                </Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="SEO meta description (leave empty to use excerpt)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">Optimal length: 150-160 characters</p>
              </div>

              <div>
                <Label htmlFor="featuredImage">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Featured Image URL
                </Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                <p className="text-xs text-gray-500 mt-1">Used for social media sharing and article previews</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <ExternalLink className="w-4 h-4 inline mr-2" />
                Polymarket Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="polymarketUrl">Polymarket Bet URL</Label>
                <Input
                  id="polymarketUrl"
                  value={formData.polymarketUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, polymarketUrl: e.target.value }))}
                  placeholder="https://polymarket.com/event/..."
                  type="url"
                />
                <p className="text-xs text-gray-500 mt-1">Link to the related Polymarket prediction</p>
              </div>

              <div>
                <Label htmlFor="polymarketId">Market ID (Optional)</Label>
                <Input
                  id="polymarketId"
                  value={formData.polymarketId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, polymarketId: e.target.value }))}
                  placeholder="Market ID for tracking"
                />
                <p className="text-xs text-gray-500 mt-1">Used for analytics and market data integration</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag"
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} size="sm">
                  Add
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-500">
                <p className="font-medium mb-1">Suggested tags:</p>
                <div className="flex flex-wrap gap-1">
                  {["polymarket", "prediction-market", "betting", "odds", "analysis"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (!formData.tags.includes(tag)) {
                          setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
                        }
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
