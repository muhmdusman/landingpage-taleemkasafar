import { SiteFooter } from "@/components/landingpage/site-footer"
import { SiteHeader } from "@/components/landingpage/site-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogsLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <Skeleton className="mx-auto h-10 w-full max-w-xl bg-white/30" />
            <Skeleton className="mx-auto mt-4 h-5 w-full max-w-2xl bg-white/30" />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden">
                <Skeleton className="aspect-video w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
