import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  // Grid pattern for background
  const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M1,1 L99,1 L99,99 L1,99 L1,1' fill='none' stroke='%23e5e7eb' strokeWidth='0.5'/%3E%3C/svg%3E")`

  return (
    <section
      id="home"
      className="w-full py-16 md:py-24 lg:py-32 xl:py-48 min-h-[80vh] md:min-h-[70vh] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/10 to-blue-500/5 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-pink-500/10 to-primary/20 z-0 mix-blend-overlay"></div>
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: gridPattern, opacity: 0.2 }}></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="container px-4 md:px-6 mt-32 md:mt-18 lg:mt-0 relative z-10">
        <div className="flex flex-col justify-center items-center text-center space-y-6 max-w-3xl mx-auto">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4 sm:text-5xl xl:text-6xl/none">
                AI-Powered Entry Test Preparation
              </h1>
            </div>
            <div>
              <p className="text-muted-foreground mt-4 mb-4 md:text-xl">
                Adaptive learning platform for ECAT, NET, FAST-NU, and GIKI with personalized study plans and AI-driven feedback tailored to your strengths and weaknesses.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="group" asChild>
              <Link href="/lms">
                Get Started
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
