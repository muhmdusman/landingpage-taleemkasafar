import Link from "next/link"
import { SectionHeading } from "@/components/landingpage/section-heading"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function PlatformSection() {
  return (
    <section id="platform" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-small-pattern opacity-10"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <SectionHeading
          title="AI-Powered Adaptive Learning"
          description="Smart, personalized preparation for ECAT, NET, FAST-NU, and GIKI entry tests using Artificial Intelligence to analyze your performance and create targeted study plans."
        />
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-blue-500/20 p-1 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-8 relative z-10">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">AI-Driven Analysis</h3>
                      <p className="text-sm text-muted-foreground">Smart performance insights</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="h-6 w-6 bg-blue-500/60 rounded-md animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">Personalized Study Plans</h3>
                      <p className="text-sm text-muted-foreground">Based on your weaknesses</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <div className="h-6 w-6 bg-purple-500/60 rounded-full animate-bounce"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">Targeted Feedback</h3>
                      <p className="text-sm text-muted-foreground">Focus on weak areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Unlike traditional platforms that provide the same material to everyone, our AI-powered system adapts to your individual learning needs. Take tests, receive detailed performance analysis, and get personalized study recommendations based on your weak areas.
            </p>
            <p className="text-muted-foreground">
              Our AI algorithms analyze your test results to generate targeted study plans with smart feedback, ensuring you focus on what matters most for your success in ECAT, NET, FAST-NU, and GIKI entry tests.
            </p>

            <div className="pt-4">
              <Link href="/lms">
                <Button className="group">
                  Start Learning
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
