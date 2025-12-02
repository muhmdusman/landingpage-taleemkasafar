'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SiteHeader } from '@/components/landingpage/site-header'
import { SiteFooter } from '@/components/landingpage/site-footer'

export default function QuizPage() {
  const router = useRouter()
  const [testType, setTestType] = useState('')

  const handleStart = () => {
    if (!testType) {
      alert('Please select a test type first.')
      return
    }

    sessionStorage.setItem('testType', testType)
    router.push('/quiz/instructions')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Start Your Mock Test
          </h1>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label
                htmlFor="testType"
                className="block text-lg font-medium mb-2"
              >
                Select Test Type
              </label>

              <select
                id="testType"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              >
                <option value="" disabled>Choose a test</option>
                <option value="nust">NUST Test</option>
                <option value="uet">UET Test</option>
                <option value="fast">FAST Test</option>
                <option value="giki">GIKI Test</option>
              </select>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Test
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
