"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import FlipClock from "@/components/quiz/flip-clock"
import { Button } from "@/components/ui/button"
import useQuizState from "@/hooks/use-quiz-state"
import { getFilteredQuestions } from "@/utils/quiz-utils"
import QuestionDisplay from "@/components/quiz/question-display"
import QuizNavigation from "@/components/quiz/quiz-navigation"
import QuestionFilter from "@/components/quiz/question-filter"
import QuestionGrid from "@/components/quiz/question-grid"
import SectionProgress from "@/components/quiz/section-progress"
import type { Question } from "@/types/quiz"

export default function QuizPage() {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [filterType, setFilterType] = useState("all")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

useEffect(() => {
  const testType = sessionStorage.getItem('testType')
  const instructionsViewed = sessionStorage.getItem('instructionsViewed')

  if (!testType || !instructionsViewed) {
    router.push('/quiz') // go back to quiz homepage if skipped steps
  }
}, [router])


  // Initialize quiz data - fetch from database
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/questions')
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setQuestions(data.questions)
      } catch (err) {
        console.error('Error fetching questions:', err)
        setError(err instanceof Error ? err.message : 'Failed to load questions')
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestions()
  }, [])

  const {
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
    handleAnswerSelect,
    saveAnswer,
    toggleReview,
    navigateToQuestion,
    navigateToSection,
    navigateToNext,
    navigateToPrevious,
    navigateToFirst,
    navigateToLast,
    submitTest,
  } = useQuizState(questions)

  const filterOptions = [
    { value: "all", label: "All Questions" },
    { value: "unattempted", label: "Unattempted Questions" },
    { value: "review", label: "Marked for Review" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="mb-4">{error}</p>
          <Button onClick={() => router.push('/quiz')}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>
  }

  const filteredQuestions = getFilteredQuestions(questions, filterType, savedAnswers, reviewQuestions)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white border-b border-gray-300">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-3">
            <div className="text-blue-800 font-semibold">{currentQuestion?.subject}</div>
            <div className="text-center text-red-600 font-bold">
              Engineering/Computer Science/BS Mathematics (With Computer Science)
            </div>
            <div className="text-right text-red-600 font-bold">
              NUST05 <span className="text-green-700">(SCME014)</span>
            </div>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto p-4">
        <QuestionDisplay
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          isSaved={savedAnswers[currentQuestionIndex] !== undefined}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between items-center mb-4">
        <div className='hidden md:block'>
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 text-white p-2 w-18 text-center">
              <div className="text-2xl">{Math.floor(timeRemaining / 60)}</div>
              <div className="text-xs">min</div>
              <div className="text-xs">Remaining</div>
            </div>
            <div className="border border-gray-300 p-2 bg-white">
              <FlipClock seconds={timeRemaining} />
            </div>
          </div>
          </div>
          <QuizNavigation
            onNext={navigateToNext}
            onPrev={navigateToPrevious}
            onSave={saveAnswer}
            onToggleReview={toggleReview}
            onNextSection={() => navigateToSection(currentSection + 1)}
            onPrevSection={() => navigateToSection(currentSection - 1)}
            onFirst={navigateToFirst}
            onLast={navigateToLast}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            isFirstSection={currentSection === 1}
            isLastSection={currentSection === 3}
            isMarkedForReview={reviewQuestions.includes(currentQuestionIndex)}
          />
        </div>

        <div className=" flex justify-between items-center mb-4">
        <div className='hidden md:block'>
          <QuestionFilter filterOptions={filterOptions} currentFilter={filterType} onFilterChange={setFilterType} />
          </div>
         
          <div className="hidden md:block">
    <QuestionGrid 
      questions={filteredQuestions}
      currentIndex={currentQuestionIndex}
      savedAnswers={savedAnswers}
      selectedAnswers={selectedAnswers}
      reviewQuestions={reviewQuestions}
      onNavigate={navigateToQuestion}
    />
  </div>

  
          <Button
            onClick={() => {
              if (window.confirm("Are you sure you want to finish the test? This action cannot be undone.")) {
                submitTest()
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Finish Test
          </Button>
        </div>

        <SectionProgress questions={questions} savedAnswers={savedAnswers} />
      </main>
    </div>
  )
}
