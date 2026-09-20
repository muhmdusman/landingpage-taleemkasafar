import Link from "next/link"
import { AlertCircle, ArrowUpRight } from "lucide-react"
import { getButterClient } from "@/lib/buttercms"
import { SiteFooter } from "@/components/landingpage/site-footer"
import { SiteHeader } from "@/components/landingpage/site-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 60

type ButterPost = {
  author?: {
    first_name?: string
    last_name?: string
  }
  featured_image?: string | null
  published?: string | null
  slug: string
  summary?: string
  title: string
  url?: string
}

type ButterPage = {
  fields?: Record<string, unknown>
  name?: string
  page_type?: string
  published?: string | null
  slug: string
  status?: string
  updated?: string | null
}

type ButterFetchError = {
  message: string
}

async function getButterContent() {
  const butter = getButterClient()

  const [postsResult, pageResult] = await Promise.allSettled([
    butter.post.list({ page: 1, page_size: 3, exclude_body: true }),
    butter.page.retrieve<Record<string, unknown>, "*", "landing-page">("*", "landing-page", {
      levels: 2,
    }),
  ])

  return {
    page:
      pageResult.status === "fulfilled"
        ? (pageResult.value.data?.data as ButterPage | undefined)
        : undefined,
    pageError: pageResult.status === "rejected" ? getErrorDetails(pageResult.reason) : undefined,
    posts:
      postsResult.status === "fulfilled"
        ? ((postsResult.value.data?.data ?? []) as ButterPost[])
        : [],
    postsError: postsResult.status === "rejected" ? getErrorDetails(postsResult.reason) : undefined,
  }
}

function getErrorDetails(error: unknown): ButterFetchError {
  return {
    message: error instanceof Error ? error.message : "Unknown ButterCMS error",
  }
}

function formatDate(date?: string | null) {
  if (!date) {
    return "Unpublished"
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

function getAuthorName(post: ButterPost) {
  const name = [post.author?.first_name, post.author?.last_name].filter(Boolean).join(" ")
  return name || "ButterCMS"
}

function renderFieldValue(value: unknown): string {
  if (value == null || value === "") {
    return "Not set"
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`
  }

  if (typeof value === "object") {
    return "Nested content"
  }

  return "Unsupported value"
}

function getRenderableFields(page?: ButterPage) {
  return Object.entries(page?.fields ?? {}).slice(0, 8)
}

export default async function ButterCMSPage() {
  try {
    const { page, pageError, posts, postsError } = await getButterContent()
    const fields = getRenderableFields(page)

    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="border-b bg-emerald-50 py-16">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl space-y-4">
                <Badge variant="secondary">Live ButterCMS Example</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">ButterCMS content</h1>
                <p className="text-lg text-muted-foreground">
                  Latest blog posts and the page with slug <span className="font-medium text-foreground">landing-page</span>,
                  fetched through the official ButterCMS JavaScript SDK.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Latest blog posts</h2>
                  <p className="text-sm text-muted-foreground">Rendered from ButterCMS Blog Engine.</p>
                </div>

                {postsError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Blog posts could not load</AlertTitle>
                    <AlertDescription>{postsError.message}</AlertDescription>
                  </Alert>
                ) : posts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {posts.map((post) => (
                      <Card key={post.slug} className="flex flex-col overflow-hidden">
                        {post.featured_image ? (
                          <img src={post.featured_image} alt="" className="aspect-video w-full object-cover" />
                        ) : null}
                        <CardHeader>
                          <CardDescription>
                            {getAuthorName(post)} · {formatDate(post.published)}
                          </CardDescription>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                          {post.summary ? (
                            <div
                              className="line-clamp-3 text-sm text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: post.summary }}
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground">No summary provided.</p>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" size="sm">
                            <Link href={post.url || `/blogs/${post.slug}`} target={post.url ? "_blank" : undefined}>
                              Read post
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No posts found</AlertTitle>
                    <AlertDescription>
                      The API request succeeded, but this ButterCMS account did not return blog posts.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <aside className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Page: landing-page</h2>
                  <p className="text-sm text-muted-foreground">Rendered from ButterCMS Pages.</p>
                </div>

                {page ? (
                  <Card>
                    <CardHeader>
                      <CardDescription>{page.page_type || "ButterCMS page"}</CardDescription>
                      <CardTitle>{page.name || page.slug}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <dl className="grid gap-3 text-sm">
                        <div className="flex justify-between gap-4 border-b pb-2">
                          <dt className="text-muted-foreground">Status</dt>
                          <dd className="font-medium">{page.status || "Unknown"}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b pb-2">
                          <dt className="text-muted-foreground">Published</dt>
                          <dd className="font-medium">{formatDate(page.published)}</dd>
                        </div>
                      </dl>

                      {fields.length > 0 ? (
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold">Fields</h3>
                          <dl className="space-y-2">
                            {fields.map(([key, value]) => (
                              <div key={key} className="rounded-md border p-3">
                                <dt className="break-words text-xs font-medium uppercase text-muted-foreground">{key}</dt>
                                <dd className="mt-1 break-words text-sm">{renderFieldValue(value)}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">This page does not have visible fields yet.</p>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Page not found</AlertTitle>
                    <AlertDescription>
                      {pageError?.message ||
                        "The API request succeeded, but ButterCMS did not return a page for slug landing-page."}
                    </AlertDescription>
                  </Alert>
                )}
              </aside>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown ButterCMS error"

    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center">
          <section className="w-full py-16">
            <div className="container px-4 md:px-6">
              <Alert variant="destructive" className="mx-auto max-w-2xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to load ButterCMS content</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }
}
