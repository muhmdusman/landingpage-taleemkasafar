"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, TrendingUp, BookOpen, Target } from "lucide-react"

interface QuizResults {
  total: number
  math: number
  physics: number
  english: number
  chemistry?: number
  aiAnalysis?: {
    success: boolean
    metrics: {
      totalQuestions: number
      correctAnswers: number
      incorrectAnswers: number
      skippedAnswers: number
      accuracy: string
      score: string
      percentage: string
      subjectWisePerformance: Record<string, { correct: number; total: number; accuracy: number }>
      weakTopics: string[]
    }
    aiFeedback: {
      overallPerformance: string
      strengths: string[]
      weaknesses: string[]
      studyRecommendations: string[]
      priorityTopics: string[]
      estimatedImprovement: string
      nextSteps: string[]
    }
    detailedAnswers?: Array<{
      questionId: number
      subject: string
      userAnswer: number | null
      correctAnswer: number
      isCorrect: boolean
      isAttempted: boolean
    }>
  }
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
    setLoading(false)
  }, [])
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p className="mb-4">You haven't completed any quiz yet.</p>
          <Link href="/quiz">
            <Button>Start Quiz</Button>
          </Link>
        </div>
      </div>
    )
  }

  const aiAnalysis = results.aiAnalysis

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Your performance analysis powered by AI</p>
        </div>

        {/* Quick Stats */}
        {aiAnalysis?.success && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Correct</p>
                  <p className="text-2xl font-bold text-green-600">{aiAnalysis.metrics.correctAnswers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Incorrect</p>
                  <p className="text-2xl font-bold text-red-600">{aiAnalysis.metrics.incorrectAnswers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Skipped</p>
                  <p className="text-2xl font-bold text-yellow-600">{aiAnalysis.metrics.skippedAnswers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-2xl font-bold text-blue-600">{aiAnalysis.metrics.percentage}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Your score in each subject</CardDescription>
            </CardHeader>
            <CardContent>
              {aiAnalysis?.success ? (
                <div className="space-y-4">
                  {Object.entries(aiAnalysis.metrics.subjectWisePerformance).map(([subject, data]) => (
                    <div key={subject}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{subject}</span>
                        <span className="text-sm text-gray-600">
                          {data.correct}/{data.total} ({data.accuracy.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            data.accuracy >= 80 ? 'bg-green-600' :
                            data.accuracy >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${data.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Mathematics</span>
                      <span className="text-sm">{results.math} / 100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(results.math / 100) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Physics</span>
                      <span className="text-sm">{results.physics} / 60</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(results.physics / 60) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">English</span>
                      <span className="text-sm">{results.english} / 40</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${(results.english / 40) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Performance Analysis */}
          {aiAnalysis?.success && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>Overall Assessment</AlertTitle>
                  <AlertDescription className="mt-2 text-sm">
                    {aiAnalysis.aiFeedback.overallPerformance}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Feedback Sections */}
        {aiAnalysis?.success && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiAnalysis.aiFeedback.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Weaknesses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertCircle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiAnalysis.aiFeedback.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Study Recommendations */}
        {aiAnalysis?.success && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Personalized Study Plan
              </CardTitle>
              <CardDescription>
                {aiAnalysis.aiFeedback.estimatedImprovement}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Recommended Actions</h3>
                <div className="grid gap-2">
                  {aiAnalysis.aiFeedback.studyRecommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Priority Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.aiFeedback.priorityTopics.map((topic, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {aiAnalysis.aiFeedback.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Answer Review */}
        {aiAnalysis?.success && aiAnalysis.detailedAnswers && (
          <Card>
            <CardHeader>
              <CardTitle>Answer Review</CardTitle>
              <CardDescription>Review your answers and correct options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {aiAnalysis.detailedAnswers.map((answer) => {
                  const optionLabels = ['A', 'B', 'C', 'D'];
                  return (
                    <div 
                      key={answer.questionId}
                      className={`p-3 rounded-lg border-2 ${
                        answer.isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : answer.isAttempted 
                            ? 'bg-red-50 border-red-200' 
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">Q{answer.questionId}</span>
                            <Badge variant="outline" className="text-xs">{answer.subject}</Badge>
                            {answer.isCorrect && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                            {!answer.isCorrect && answer.isAttempted && (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            {!answer.isAttempted && (
                              <AlertCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div className="text-sm space-y-1">
                            {answer.isAttempted ? (
                              <>
                                <p>
                                  <span className="text-gray-600">Your Answer: </span>
                                  <span className={answer.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                                    {optionLabels[answer.userAnswer!]}
                                  </span>
                                </p>
                                {!answer.isCorrect && (
                                  <p>
                                    <span className="text-gray-600">Correct Answer: </span>
                                    <span className="text-green-700 font-medium">
                                      {optionLabels[answer.correctAnswer]}
                                    </span>
                                  </p>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="text-gray-500">Not Attempted</p>
                                <p>
                                  <span className="text-gray-600">Correct Answer: </span>
                                  <span className="text-green-700 font-medium">
                                    {optionLabels[answer.correctAnswer]}
                                  </span>
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardFooter className="flex justify-center gap-4 pt-6">
            <Link href="/quiz">
              <Button>Take Another Test</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">View Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
