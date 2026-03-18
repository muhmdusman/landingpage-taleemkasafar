import React from "react";
import Lmsheader from "@/components/lms/lmsheader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PerformancePage() {
  const performanceHistory = [
    { id: 1, testName: "NUST Mock 1", date: "2026-03-01", score: "80%", status: "Passed", badge: "default" },
    { id: 2, testName: "Physics Quiz 4", date: "2026-03-05", score: "72%", status: "Passed", badge: "secondary" },
    { id: 3, testName: "Math Algebra Tests", date: "2026-03-10", score: "55%", status: "Needs Improvement", badge: "destructive" },
    { id: 4, testName: "English Vocab", date: "2026-03-12", score: "93%", status: "Excellent", badge: "default" },
    { id: 5, testName: "NUST Full Mock 2", date: "2026-03-16", score: "85%", status: "Passed", badge: "default" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Lmsheader />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full mt-20">
        <h1 className="text-3xl font-bold mb-6">Overall Performance</h1>
        <p className="text-muted-foreground mb-8">Detailed tracking on your recent exam results and overall mock tests score history.</p>
        
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
            <CardDescription>Your last 5 exam attempts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceHistory.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.testName}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell className="font-semibold">{row.score}</TableCell>
                    <TableCell className="text-right">
                       <Badge variant={row.badge as "default"|"secondary"|"destructive"}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
