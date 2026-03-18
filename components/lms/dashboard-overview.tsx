"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Target, BrainCircuit, ArrowRight } from "lucide-react";

export function DashboardOverview() {
  const subjects = [
    { name: "Mathematics", score: 85 },
    { name: "Physics", score: 72 },
    { name: "English", score: 90 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mt-8 p-4 text-left">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h3 className="text-2xl font-bold">Your Dashboard</h3>
        <div className="flex items-center gap-2">
          <Link href="/lms/analytics">
             <Button variant="outline" size="sm">Analytics</Button>
          </Link>
          <Link href="/lms/performance">
             <Button variant="outline" size="sm">Performance</Button>
          </Link>
          <Link href="/lms/subject-performance">
             <Button variant="outline" size="sm">Subject Wise</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">82.3%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Mastered</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Out of 30 syllabus topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 Days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subject Performance Overview</CardTitle>
          <Link href="/lms/subject-performance" className="text-sm text-purple-600 flex items-center hover:underline">
            View Details <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjects.map((sub, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{sub.name}</span>
                <span className="text-muted-foreground">{sub.score}%</span>
              </div>
              <Progress value={sub.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
