import "server-only"

import { getButterClient } from "@/lib/buttercms"

export type ButterBlogPost = {
  authorName: string
  body?: string
  category: string
  date: string | null
  excerpt: string
  featuredImage: string | null
  featuredImageAlt: string
  readingTime: number
  slug: string
  title: string
}

type ButterPost = {
  author?: {
    first_name?: string
    last_name?: string
  }
  body?: string
  categories?: Array<{
    name?: string
  }>
  featured_image?: string | null
  featured_image_alt?: string
  published?: string | null
  slug: string
  summary?: string
  title: string
}

export async function getButterBlogPosts(limit = 12) {
  const butter = getButterClient()
  const response = await butter.post.list({
    page: 1,
    page_size: limit,
    exclude_body: true,
  })

  return (response.data?.data ?? []).map(mapButterPost)
}

export async function getButterBlogPost(slug: string) {
  const butter = getButterClient()

  try {
    const response = await butter.post.retrieve(slug)
    const post = response.data?.data

    return post ? mapButterPost(post) : null
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) {
      return null
    }

    throw error
  }
}

function mapButterPost(post: ButterPost): ButterBlogPost {
  return {
    authorName: getAuthorName(post),
    body: post.body,
    category: post.categories?.[0]?.name || "Blog",
    date: post.published ?? null,
    excerpt: stripHtml(post.summary ?? ""),
    featuredImage: post.featured_image ?? null,
    featuredImageAlt: post.featured_image_alt || post.title,
    readingTime: estimateReadingTime(post.body || post.summary || ""),
    slug: post.slug,
    title: post.title,
  }
}

function getAuthorName(post: ButterPost) {
  const name = [post.author?.first_name, post.author?.last_name].filter(Boolean).join(" ")

  return name || "Taleem Ka Safar"
}

function estimateReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 200))
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}
