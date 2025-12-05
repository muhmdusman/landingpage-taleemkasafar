"use client"

import { useRouter } from "next/navigation"
import type { Question } from "@/types/quiz"
import useQuizTimer from "./use-quiz-timer"
import useQuizNavigation from "./use-quiz-navigation"
import useQuizAnswers from "./use-quiz-answers"
import useQuizSession from "./use-quiz-session"

export default function useQuizState(initialQuestions: Question[]) {
  const router = useRouter()

  const {
    selectedAnswers,
    savedAnswers,
    reviewQuestions,
    handleAnswerSelect,
    saveAnswer,
    toggleReview,
    calculateScores,
  } = useQuizAnswers(initialQuestions)

  const {
    currentQuestionIndex,
    currentQuestion,
    currentSection,
    isFirstQuestion,
    isLastQuestion,
    isFirstInSection,
    isLastInSection,
    navigateToQuestion,
    navigateToSection,
    navigateToNext,
    navigateToPrevious,
    navigateToFirst,
    navigateToLast,
  } = useQuizNavigation(initialQuestions)

  const submitTest = async () => {
    // Calculate scores
    const results = calculateScores()

    // Get test metadata
    const testType = sessionStorage.getItem('testType') || 'ECAT'
    const startTime = sessionStorage.getItem('quizStartTime')
    const timeTaken = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0

    console.log('=== QUIZ SUBMISSION DEBUG ===');
    console.log('Total questions:', initialQuestions.length);
    console.log('Saved answers object:', savedAnswers);
    console.log('Saved answers count:', Object.keys(savedAnswers).length);
    console.log('Sample savedAnswers entries:', Object.entries(savedAnswers).slice(0, 5));

    // Prepare answers for AI analysis
    const answersForAI = initialQuestions.map((question, index) => {
      const userAnswer = savedAnswers[index];
      const isAttempted = userAnswer !== undefined;
      const isCorrect = isAttempted && userAnswer === question.correctAnswer;
      
      if (index < 3 || isAttempted) {
        console.log(`Question ${index + 1}:`, {
          subject: question.subject,
          correctAnswer: question.correctAnswer,
          userAnswer,
          isAttempted,
          isCorrect
        });
      }
      
      return {
        questionId: index + 1,
        subject: question.subject,
        userAnswer: isAttempted ? userAnswer : null,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    console.log('Prepared answers (first 3):', answersForAI.slice(0, 3));
    console.log('Total correct:', answersForAI.filter(a => a.isCorrect).length);
    console.log('=== END DEBUG ===');

    try {
      // Submit to AI feedback API
      const response = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testType,
          testName: `${testType} Practice Test`,
          timeTaken,
          answers: answersForAI,
        }),
      })

      const aiResult = await response.json()

      // Save both basic results and AI feedback
      localStorage.setItem("quizResults", JSON.stringify({
        ...results,
        aiAnalysis: aiResult.success ? aiResult : null,
      }))
    } catch (error) {
      console.error('Error getting AI feedback:', error)
      // Still save basic results even if AI fails
      localStorage.setItem("quizResults", JSON.stringify(results))
    }

    // Clear session
    clearSession()

    // Navigate to results page
    router.push("/quiz/results")
  }

  const { timeRemaining, pauseTimer } = useQuizTimer(3 * 60 * 60, submitTest)

  const { clearSession } = useQuizSession(
    currentQuestionIndex,
    selectedAnswers,
    savedAnswers,
    reviewQuestions,
    timeRemaining,
  )

  return {
    currentQuestionIndex,
    currentQuestion,
    selectedAnswers,
    savedAnswers,
    reviewQuestions,
    timeRemaining,
    isFirstQuestion,
    isLastQuestion,
    currentSection,
    isFirstInSection,
    isLastInSection,
    handleAnswerSelect: (answerIndex: number) => handleAnswerSelect(currentQuestionIndex, answerIndex),
    saveAnswer: () => saveAnswer(currentQuestionIndex),
    toggleReview: () => toggleReview(currentQuestionIndex),
    navigateToQuestion,
    navigateToSection,
    navigateToNext,
    navigateToPrevious,
    navigateToFirst,
    navigateToLast,
    submitTest,
    pauseTimer,
  }
}
