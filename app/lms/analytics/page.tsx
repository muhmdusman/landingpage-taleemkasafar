import React from "react";
import Lmsheader from "@/components/lms/lmsheader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Activity, Clock, Award } from "lucide-react";

export default function AnalyticsPage() {
  const analyticsData = [
    { title: "Weekly Study Hours", value: "14.5 hrs", icon: <Clock className="h-4 w-4 text-blue-500" /> },
    { title: "Test Completion Rate", value: "92%", icon: <Activity className="h-4 w-4 text-green-500" /> },
    { title: "Mock Tests Passed", value: "8/10", icon: <Award className="h-4 w-4 text-orange-500" /> },
    { title: "Overall Rank", value: "Top 15%", icon: <BarChart className="h-4 w-4 text-purple-500" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Lmsheader />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full mt-20">
        <h1 className="text-3xl font-bold mb-6">Learning Analytics</h1>
        <p className="text-muted-foreground mb-8">Track your study habits and engagement over time.</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsData.map((data, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
                {data.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity Timeline</CardTitle>
            <CardDescription>Your interactions over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Today", action: "Completed Mathematics Mock Test #4 (Score: 88%)" },
                { day: "Yesterday", action: "Studied Physics - Thermodynamics for 2 hours" },
                { day: "2 days ago", action: "Completed English Vocabulary Quiz (Score: 95%)" },
                { day: "3 days ago", action: "Started completely new module: Organic Chemistry" },
              ].map((item, i) => (
                <div key={i} className="flex border-l-2 p-2 pl-4 border-blue-500">
                  <div className="w-24 font-semibold text-sm text-gray-600">{item.day}</div>
                  <div className="text-sm">{item.action}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
