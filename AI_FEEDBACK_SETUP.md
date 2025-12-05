# AI Feedback System Setup

## Overview
The system now uses Google Gemini AI to generate personalized feedback after test submission.

## Features Implemented

### ✅ Test Data Evaluation
- Calculates overall accuracy
- Analyzes subject-wise performance
- Identifies weak topics (< 60% accuracy)
- Tracks correct, incorrect, and skipped answers

### ✅ AI-Powered Feedback Generation
- Overall performance assessment
- Identified strengths and weaknesses
- Personalized study recommendations
- Priority topics to focus on
- Estimated improvement timeline
- Specific next steps

## Setup Instructions

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### 2. Add API Key to Environment

Open `.env.local` and add:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Test the System

Submit a test using this format:

```javascript
const response = await fetch('/api/submit-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    testType: 'ECAT',
    testName: 'Mock Test #1',
    timeTaken: 3600, // seconds
    answers: [
      {
        questionId: 1,
        subject: 'Math',
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true
      },
      {
        questionId: 2,
        subject: 'Physics',
        userAnswer: 1,
        correctAnswer: 3,
        isCorrect: false
      }
      // ... more answers
    ]
  })
});

const result = await response.json();
console.log(result);
```

## API Response Structure

```json
{
  "success": true,
  "metrics": {
    "totalQuestions": 100,
    "correctAnswers": 75,
    "incorrectAnswers": 20,
    "skippedAnswers": 5,
    "accuracy": "75.00",
    "score": "75/100",
    "percentage": "75.0%",
    "subjectWisePerformance": {
      "Math": { "correct": 20, "total": 25, "accuracy": 80 },
      "Physics": { "correct": 18, "total": 25, "accuracy": 72 },
      "Chemistry": { "correct": 17, "total": 25, "accuracy": 68 },
      "English": { "correct": 20, "total": 25, "accuracy": 80 }
    },
    "weakTopics": ["Chemistry"]
  },
  "aiFeedback": {
    "overallPerformance": "You scored 75% which is a solid performance...",
    "strengths": [
      "Excellent grasp of mathematical concepts",
      "Strong vocabulary and grammar skills"
    ],
    "weaknesses": [
      "Need improvement in organic chemistry",
      "Time management could be better"
    ],
    "studyRecommendations": [
      "Focus 30 minutes daily on chemistry basics",
      "Practice timed mock tests twice a week",
      "Review incorrect answers thoroughly"
    ],
    "priorityTopics": [
      "Organic Chemistry - Nomenclature",
      "Inorganic Chemistry - Periodic Table",
      "Physical Chemistry - Stoichiometry"
    ],
    "estimatedImprovement": "With focused practice, expect 10-15% improvement in 3 weeks",
    "nextSteps": [
      "Review this test within 24 hours",
      "Create flashcards for chemistry concepts",
      "Schedule next practice test in 3 days"
    ]
  },
  "testResult": {
    "testType": "ECAT",
    "testName": "Mock Test #1",
    "submittedAt": "2025-12-05T10:30:00.000Z",
    "userId": "user_xxx"
  }
}
```

## Integration with Quiz Page

Update your quiz results page to call this API:

```typescript
const handleSubmitTest = async (answers) => {
  const response = await fetch('/api/submit-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      testType: 'ECAT',
      testName: 'Practice Test',
      timeTaken: elapsedTime,
      answers: answers.map(a => ({
        questionId: a.id,
        subject: a.subject,
        userAnswer: a.selected,
        correctAnswer: a.correct,
        isCorrect: a.selected === a.correct
      }))
    })
  });

  const result = await response.json();
  
  // Display feedback to student
  showResults(result.metrics, result.aiFeedback);
};
```

## Fallback Mechanism

If Gemini API is unavailable or the key is missing, the system provides:
- Basic performance metrics
- Rule-based feedback
- Generic study recommendations

This ensures students always receive feedback, even if AI is down.

## Cost Considerations

- Gemini API has a generous free tier
- ~1000 requests/day free
- Each test submission = 1 API call
- Monitor usage at [Google AI Studio](https://makersuite.google.com)

## Next Steps

1. ✅ Get Gemini API key
2. ✅ Add to `.env.local`
3. 🔄 Update quiz page to call `/api/submit-test`
4. 🔄 Create results display component
5. 🔄 Store results in Supabase for dashboard

Would you like me to update the quiz results page to integrate this API?
