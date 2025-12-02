import React from "react";
import { SiteHeader } from "@/components/landingpage/site-header";
import { SiteFooter } from "@/components/landingpage/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, TrendingUp, Award, Clock, Target, ChevronRight } from "lucide-react";

const Page = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized study recommendations based on your performance"
    },
    {
      icon: Target,
      title: "Targeted Practice",
      description: "Focus on weak areas with adaptive question selection"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your progress with detailed performance insights"
    },
    {
      icon: Award,
      title: "Expert Strategies",
      description: "Learn proven techniques to maximize your test scores"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 min-h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/10 to-blue-500/5 z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-pink-500/10 to-primary/20 z-0 mix-blend-overlay"></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col justify-center items-center text-center space-y-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master Your Entry Test
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
                  Prepare for ECAT, NET, FAST-NU, and GIKI with AI-powered adaptive learning, personalized study plans, and detailed analytics.
                </p>
              </div>
              
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="group" asChild size="lg">
                  <Link href="/quiz">
                    Start Practice Test
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Experience AI-driven personalized learning tailored to your needs
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Test Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Available Test Categories
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive preparation for all major Pakistani university entry tests
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "ECAT", icon: BookOpen },
                { name: "NET", icon: Brain },
                { name: "FAST-NU", icon: Target },
                { name: "GIKI", icon: Award }
              ].map((category, index) => (
                <Card key={index} className="cursor-pointer transition-all hover:shadow-lg group">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <category.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Begin Your Journey?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of students preparing smarter with AI-powered adaptive learning
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/quiz">
                  Start Your First Test Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Page;
