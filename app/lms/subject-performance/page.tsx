import React from "react";
import Lmsheader from "@/components/lms/lmsheader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SubjectPerformancePage() {
  const subjectStats = [
    { name: "Mathematics", score: 85, weakness: "Integration", strength: "Algebra" },
    { name: "Physics", score: 72, weakness: "Thermodynamics", strength: "Kinematics" },
    { name: "English", score: 90, weakness: "Vocabulary", strength: "Grammar Rules" },
    { name: "Chemistry", score: 65, weakness: "Organic Chemistry", strength: "Atomic Structure" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Lmsheader />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full mt-20">
        <h1 className="text-3xl font-bold mb-6">Subject Wise Performance</h1>
        <p className="text-muted-foreground mb-8">Identify your strong subjects and areas where you need to improve to maximize your entry test scores.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {subjectStats.map((sub, index) => (
            <Card key={index} className="shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{sub.name}</CardTitle>
                <CardDescription>Overall Score: {sub.score}%</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={sub.score} className="h-2 mb-4 bg-gray-200" />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <h5 className="text-xs font-semibold text-red-600 uppercase mb-1">Needs Work</h5>
                    <p className="text-sm font-medium text-gray-800">{sub.weakness}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                     <h5 className="text-xs font-semibold text-green-600 uppercase mb-1">Strongest In</h5>
                    <p className="text-sm font-medium text-gray-800">{sub.strength}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
