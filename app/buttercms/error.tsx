"use client"

import { useEffect } from "react"
import { AlertCircle, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/landingpage/site-footer"
import { SiteHeader } from "@/components/landingpage/site-header"

export default function ButterCMSError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <h1 className="text-3xl font-bold tracking-tight">ButterCMS content could not load</h1>
              <p className="text-muted-foreground">
                Check the API token, page slug, and ButterCMS content status, then try again.
              </p>
              <Button onClick={reset}>
                <RotateCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
