"use client";

import React, { useState } from "react";
import { SiteHeader } from "@/components/landingpage/site-header";
import { SiteFooter } from "@/components/landingpage/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Target, Award, Brain, Clock, 
  BookOpen, AlertCircle, CheckCircle, Zap, BarChart3, Calendar
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data - will be replaced with actual API data
  const studentStats = {
    totalTests: 24,
    averageScore: 76,
    totalQuestions: 480,
    studyTime: "42h 15m",
    improvement: 12,
    rank: 142,
    streak: 7
  };

  const performanceData = [
    { date: '20 Nov', score: 65, average: 70 },
    { date: '22 Nov', score: 70, average: 72 },
    { date: '24 Nov', score: 68, average: 71 },
    { date: '26 Nov', score: 75, average: 73 },
    { date: '28 Nov', score: 78, average: 74 },
    { date: '30 Nov', score: 82, average: 75 },
    { date: '02 Dec', score: 85, average: 76 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 82, attempted: 120, correct: 98 },
    { subject: 'Physics', score: 75, attempted: 100, correct: 75 },
    { subject: 'Chemistry', score: 70, attempted: 110, correct: 77 },
    { subject: 'English', score: 88, attempted: 90, correct: 79 },
    { subject: 'Logical Reasoning', score: 65, attempted: 60, correct: 39 }
  ];

  const topicStrength = [
    { topic: 'Algebra', strength: 85 },
    { topic: 'Mechanics', strength: 75 },
    { topic: 'Organic Chemistry', strength: 70 },
    { topic: 'Grammar', strength: 90 },
    { topic: 'Vocabulary', strength: 85 },
    { topic: 'Calculus', strength: 65 }
  ];

  const radarData = [
    { subject: 'Math', score: 82, fullMark: 100 },
    { subject: 'Physics', score: 75, fullMark: 100 },
    { subject: 'Chemistry', score: 70, fullMark: 100 },
    { subject: 'English', score: 88, fullMark: 100 },
    { subject: 'Logic', score: 65, fullMark: 100 }
  ];

  const accuracyData = [
    { name: 'Correct', value: 354, color: '#22c55e' },
    { name: 'Incorrect', value: 98, color: '#ef4444' },
    { name: 'Skipped', value: 28, color: '#f59e0b' }
  ];

  const recentTests = [
    { name: 'ECAT Mock Test #12', date: '2 Dec 2025', score: 85, total: 100, time: '45m' },
    { name: 'NET Practice #8', date: '30 Nov 2025', score: 82, total: 100, time: '50m' },
    { name: 'Physics Chapter Test', date: '28 Nov 2025', score: 78, total: 100, time: '30m' },
    { name: 'Math Quick Quiz', date: '26 Nov 2025', score: 75, total: 100, time: '25m' }
  ];

  const aiFeedback = [
    {
      type: "strength",
      title: "Strong Performance in Mathematics",
      message: "You've shown consistent improvement in Algebra and Calculus. Keep practicing complex problems.",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      type: "warning",
      title: "Focus Needed: Logical Reasoning",
      message: "Your accuracy in logical reasoning is below target. Recommend daily practice of 10 questions.",
      icon: AlertCircle,
      color: "text-orange-600"
    },
    {
      type: "suggestion",
      title: "AI Recommendation",
      message: "Based on your performance, focus on Organic Chemistry concepts. Allocate 30 minutes daily.",
      icon: Brain,
      color: "text-blue-600"
    }
  ];

  const studyPlan = [
    { day: 'Monday', focus: 'Mathematics - Calculus', duration: '2 hours', completed: true },
    { day: 'Tuesday', focus: 'Physics - Mechanics', duration: '1.5 hours', completed: true },
    { day: 'Wednesday', focus: 'Chemistry - Organic', duration: '2 hours', completed: true },
    { day: 'Thursday', focus: 'Logical Reasoning', duration: '1 hour', completed: false },
    { day: 'Friday', focus: 'English - Vocabulary', duration: '1 hour', completed: false },
    { day: 'Saturday', focus: 'Full Mock Test', duration: '2 hours', completed: false },
    { day: 'Sunday', focus: 'Review & Practice', duration: '2 hours', completed: false }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your progress, view AI-powered insights, and improve your performance</p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentStats.totalTests}</div>
                <p className="text-xs text-muted-foreground">
                  {studentStats.totalQuestions} questions attempted
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentStats.averageScore}%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{studentStats.improvement}% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentStats.studyTime}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{studentStats.rank}</div>
                <p className="text-xs text-muted-foreground">
                  {studentStats.streak} day streak 🔥
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Performance Trend */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                    <CardDescription>Your score progression over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" name="Your Score" />
                        <Line type="monotone" dataKey="average" stroke="#10b981" name="Class Average" strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Accuracy Breakdown */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Accuracy Breakdown</CardTitle>
                    <CardDescription>Question attempt analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={accuracyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {accuracyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {accuracyData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}: {item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Tests */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Test Attempts</CardTitle>
                  <CardDescription>Your latest test performances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {test.date} • {test.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{test.score}%</p>
                          <p className="text-sm text-muted-foreground">{test.score}/{test.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Subject-wise Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Score comparison across subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={subjectPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#8b5cf6" name="Score %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Radar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Assessment</CardTitle>
                    <CardDescription>Overall capability analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Your Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Topic-wise Strength */}
              <Card>
                <CardHeader>
                  <CardTitle>Topic-wise Strength Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of your strengths and weaknesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topicStrength.map((topic, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{topic.topic}</span>
                          <span className="text-sm text-muted-foreground">{topic.strength}%</span>
                        </div>
                        <Progress value={topic.strength} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Subject Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Subject Statistics</CardTitle>
                  <CardDescription>Question-level analysis by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectPerformance.map((subject, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{subject.subject}</h4>
                          <Badge variant={subject.score >= 75 ? "default" : "secondary"}>
                            {subject.score}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Attempted</p>
                            <p className="font-medium">{subject.attempted}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Correct</p>
                            <p className="font-medium text-green-600">{subject.correct}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Incorrect</p>
                            <p className="font-medium text-red-600">{subject.attempted - subject.correct}</p>
                          </div>
                        </div>
                        <Progress value={subject.score} className="h-2 mt-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="ai-insights" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Powered Feedback & Recommendations
                  </CardTitle>
                  <CardDescription>Personalized insights based on your performance analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiFeedback.map((feedback, index) => {
                    const Icon = feedback.icon;
                    return (
                      <Alert key={index}>
                        <Icon className={`h-4 w-4 ${feedback.color}`} />
                        <AlertTitle>{feedback.title}</AlertTitle>
                        <AlertDescription>{feedback.message}</AlertDescription>
                      </Alert>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Improvement Plan</CardTitle>
                  <CardDescription>AI-generated study recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        Priority Focus Areas
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span><strong>Logical Reasoning:</strong> Practice 10 questions daily. Current accuracy: 65% → Target: 80%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span><strong>Chemistry - Organic:</strong> Review reaction mechanisms. Weak in nomenclature (45% accuracy)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span><strong>Physics - Mechanics:</strong> Focus on collision and momentum problems</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Strengths to Maintain
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span><strong>Mathematics:</strong> Excellent in Algebra (82%). Continue advanced problem-solving</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span><strong>English:</strong> Strong vocabulary (88%). Maintain daily reading practice</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        Weekly Goals
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Complete 3 full-length mock tests</span>
                          <Badge variant="outline">0/3</Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Improve Logical Reasoning by 10%</span>
                          <Badge variant="outline">In Progress</Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Study time: 15 hours</span>
                          <Badge variant="outline">8.5/15h</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Study Plan Tab */}
            <TabsContent value="study-plan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Weekly Study Plan</CardTitle>
                  <CardDescription>Personalized schedule based on your performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studyPlan.map((plan, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border transition-all ${
                          plan.completed 
                            ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' 
                            : 'bg-background hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              plan.completed ? 'bg-green-600' : 'bg-muted'
                            }`}>
                              {plan.completed ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{plan.day}</p>
                              <p className="text-sm text-muted-foreground">{plan.focus}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={plan.completed ? "default" : "secondary"}>
                              {plan.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Resources</CardTitle>
                  <CardDescription>Study materials tailored to your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Logical Reasoning Practice Problems
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Organic Chemistry Video Lectures
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Physics Mechanics Worksheet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default DashboardPage;
