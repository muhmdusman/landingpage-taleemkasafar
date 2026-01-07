import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateAIFeedback, calculateTestMetrics } from '@/lib/gemini-ai';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const testData = await request.json();
    const {
      testType,
      testName,
      answers,
      timeTaken
    } = testData;

    // Validate required fields
    if (!testType || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate test metrics
    const metrics = calculateTestMetrics({ answers });

    // Prepare test result for AI analysis
    const testResult = {
      testType,
      totalQuestions: metrics.totalQuestions,
      correctAnswers: metrics.correctAnswers,
      incorrectAnswers: metrics.incorrectAnswers,
      skippedAnswers: metrics.skippedAnswers,
      accuracy: metrics.accuracy,
      timeTaken: timeTaken || 0,
      subjectWisePerformance: metrics.subjectWisePerformance,
      weakTopics: metrics.weakTopics,
      detailedAnswers: answers // Include full answer details for deeper AI analysis
    };

    // Generate AI feedback using Gemini
    console.log('Generating AI feedback for test submission...');
    console.log('Test metrics:', metrics);
    console.log('Sample answers:', answers.slice(0, 3));
    const aiFeedback = await generateAIFeedback(testResult);

    // Prepare response
    const response = {
      success: true,
      metrics: {
        totalQuestions: metrics.totalQuestions,
        correctAnswers: metrics.correctAnswers,
        incorrectAnswers: metrics.incorrectAnswers,
        skippedAnswers: metrics.skippedAnswers,
        accuracy: metrics.accuracy.toFixed(2),
        score: `${metrics.correctAnswers}/${metrics.totalQuestions}`,
        percentage: `${metrics.accuracy.toFixed(1)}%`,
        subjectWisePerformance: metrics.subjectWisePerformance,
        weakTopics: metrics.weakTopics
      },
      aiFeedback: {
        overallPerformance: aiFeedback.overallPerformance,
        strengths: aiFeedback.strengths,
        weaknesses: aiFeedback.weaknesses,
        studyRecommendations: aiFeedback.studyRecommendations,
        priorityTopics: aiFeedback.priorityTopics,
        estimatedImprovement: aiFeedback.estimatedImprovement,
        nextSteps: aiFeedback.nextSteps
      },
      testResult: {
        testType,
        testName,
        submittedAt: new Date().toISOString(),
        userId
      },
      // Include detailed answers with correct options for review
      detailedAnswers: answers.map((answer: any) => ({
        questionId: answer.questionId,
        subject: answer.subject,
        userAnswer: answer.userAnswer,
        correctAnswer: answer.correctAnswer,
        isCorrect: answer.isCorrect,
        isAttempted: answer.userAnswer !== null
      }))
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Test submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process test submission' },
      { status: 500 }
    );
  }
}
