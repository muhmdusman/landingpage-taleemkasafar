import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/landingpage/site-header"
import { SiteFooter } from "@/components/landingpage/site-footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getButterBlogPosts } from "@/lib/buttercms-blog"

export const dynamic = "force-dynamic"

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

export default async function BlogsPage() {
  const blogs = await getButterBlogPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Entry Test Strategies & Tips</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover expert strategies, tips, and insights to help you ace your entry tests and secure admission to
              your dream university.
            </p>
          </div>
        </section>

        {/* Blog Listing */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {blogs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <Card key={blog.slug} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={blog.featuredImage || "/placeholder.svg"}
                        alt={blog.featuredImageAlt}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(blog.date)}</span>
                      </div>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription>{blog.authorName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3">{blog.excerpt || "Read the latest update from Taleem Ka Safar."}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/blogs/${blog.slug}`}>
                        <Button variant="outline">Read More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No blog posts yet</AlertTitle>
                <AlertDescription>
                  Publish a post in the ButterCMS Blog Posts dashboard and it will appear here.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
