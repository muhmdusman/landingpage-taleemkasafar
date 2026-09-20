import { SiteFooter } from "@/components/landingpage/site-footer"
import { SiteHeader } from "@/components/landingpage/site-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingButterCMSPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b bg-emerald-50 py-16">
          <div className="container px-4 md:px-6">
            <Skeleton className="h-10 w-full max-w-lg" />
            <Skeleton className="mt-4 h-5 w-full max-w-2xl" />
          </div>
        </section>
        <section className="py-12">
          <div className="container grid gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <Skeleton className="h-6 w-4/5" />
                  <Skeleton className="h-4 w-2/5" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-9 w-28" />
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
