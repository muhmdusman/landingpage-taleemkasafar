import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/landingpage/site-header"
import { SiteFooter } from "@/components/landingpage/site-footer"
import { getButterBlogPost, getButterBlogPosts } from "@/lib/buttercms-blog"
import { CalendarIcon, User2Icon, Clock3Icon } from "lucide-react"

export const dynamic = "force-dynamic"
export const dynamicParams = true

function formatDate(date: string | null) {
  if (!date) {
    return "Unpublished"
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params)
  const post = await getButterBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = (await getButterBlogPosts(4))
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Blog Header */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User2Icon className="h-4 w-4" />
                  <span>{post.authorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock3Icon className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
              <div>
                <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
                  <img
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.featuredImageAlt}
                    className="object-cover w-full h-full"
                  />
                </div>

                {post.body ? (
                  <div
                    className="prose prose-emerald max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                  />
                ) : (
                  <p className="text-muted-foreground">{post.excerpt || "This post does not have body content yet."}</p>
                )}

                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Share this article</h3>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Twitter
                        </Button>
                        <Button size="sm" variant="outline">
                          Facebook
                        </Button>
                        <Button size="sm" variant="outline">
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Link href="/blogs">
                        <Button variant="outline">Back to Blogs</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Latest Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Card key={related.slug}>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{related.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-gray-500 line-clamp-2">{related.excerpt}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Link href={`/blogs/${related.slug}`}>
                            <Button variant="link" className="p-0">
                              Read More
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Study Tips
                    </Button>
                    <Button variant="outline" size="sm">
                      Test Strategies
                    </Button>
                    <Button variant="outline" size="sm">
                      Time Management
                    </Button>
                    <Button variant="outline" size="sm">
                      Subject Guides
                    </Button>
                    <Button variant="outline" size="sm">
                      Success Stories
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* More Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-8 text-center">
              More Articles You Might Like
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((blog) => (
                <Card key={blog.slug} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={blog.featuredImage || "/placeholder.svg"}
                      alt={blog.featuredImageAlt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{blog.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blogs/${blog.slug}`}>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
