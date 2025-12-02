import type React from "react"
import { BookOpen, BarChart2, Clock, LineChart } from "lucide-react"
import { SectionHeading } from "@/components/landingpage/section-heading"

interface FeatureCardProps {
  icon: React.ComponentType<any>
  title: string
  description: string
  index: number
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <div 
      className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="rounded-full bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  )
}

export function FeatureSection() {
  const features = [
    {
      icon: BookOpen,
      title: "ECAT, NET, FAST & GIKI",
      description: "Comprehensive practice tests for all major Pakistani university entry exams.",
    },
    {
      icon: Clock,
      title: "AI-Powered Feedback",
      description: "Receive personalized recommendations and smart feedback based on your performance.",
    },
    {
      icon: BarChart2,
      title: "Detailed Analysis",
      description: "View performance breakdowns by subject, topic, and difficulty level.",
    },
    {
      icon: LineChart,
      title: "Adaptive Study Plans",
      description: "AI algorithms generate targeted study plans focusing on your weak areas.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Features"
          description="AI-driven tools that adapt to your learning style and focus on your individual needs."
        />
        <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
