import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface TestResult {
  testType: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  timeTaken: number;
  subjectWisePerformance: Record<string, { correct: number; total: number; accuracy: number }>;
  weakTopics: string[];
  detailedAnswers?: any[]; // Include full answer details for deeper analysis
}

export interface AIFeedback {
  overallPerformance: string;
  strengths: string[];
  weaknesses: string[];
  studyRecommendations: string[];
  priorityTopics: string[];
  estimatedImprovement: string;
  nextSteps: string[];
}

export async function generateAIFeedback(testResult: TestResult): Promise<AIFeedback> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Group incorrect and skipped questions by subject for detailed analysis
    const incorrectBySubject: Record<string, number> = {};
    const skippedBySubject: Record<string, number> = {};
    
    if (testResult.detailedAnswers) {
      testResult.detailedAnswers.forEach(answer => {
        const subject = answer.subject;
        if (!answer.isCorrect && answer.userAnswer !== null) {
          incorrectBySubject[subject] = (incorrectBySubject[subject] || 0) + 1;
        }
        if (answer.userAnswer === null) {
          skippedBySubject[subject] = (skippedBySubject[subject] || 0) + 1;
        }
      });
    }

    const prompt = `
You are an expert educational advisor and psychologist specializing in Pakistani university entry tests (ECAT, NET, FAST-NU, GIKI).

CRITICAL: Provide UNIQUE, PERSONALIZED analysis based on this SPECIFIC student's performance pattern. DO NOT use generic templates.

=== STUDENT PERFORMANCE DATA ===
Test Type: ${testResult.testType}
Total Questions: ${testResult.totalQuestions}
Correct Answers: ${testResult.correctAnswers}
Incorrect Answers: ${testResult.incorrectAnswers}
Skipped Questions: ${testResult.skippedAnswers}
Overall Accuracy: ${testResult.accuracy.toFixed(2)}%
Time Taken: ${Math.floor(testResult.timeTaken / 60)} minutes ${testResult.timeTaken % 60} seconds
Average Time per Question: ${testResult.timeTaken > 0 ? (testResult.timeTaken / testResult.totalQuestions).toFixed(1) : 0} seconds

SUBJECT-WISE BREAKDOWN:
${Object.entries(testResult.subjectWisePerformance)
  .map(([subject, stats]) => {
    const incorrect = incorrectBySubject[subject] || 0;
    const skipped = skippedBySubject[subject] || 0;
    return `${subject}:
  - Total: ${stats.total} questions
  - Correct: ${stats.correct} (${stats.accuracy.toFixed(1)}%)
  - Incorrect: ${incorrect}
  - Skipped: ${skipped}
  - Error Rate: ${((incorrect / stats.total) * 100).toFixed(1)}%
  - Skip Rate: ${((skipped / stats.total) * 100).toFixed(1)}%`;
  })
  .join('\n\n')}

=== ANALYSIS REQUIREMENTS ===

1. PERFORMANCE PATTERN ANALYSIS:
   - Identify if student is rushing (many incorrect) vs hesitant (many skipped)
   - Compare subject performances to find relative strengths
   - Analyze time management (fast/slow per question)
   - Identify consistency patterns across subjects

2. SUBJECT-SPECIFIC INSIGHTS:
   - For ${testResult.testType}, analyze performance against typical difficulty patterns
   - Mathematics: Identify if algebra, calculus, geometry, or word problems are weak
   - Physics: Determine if mechanics, electricity, thermodynamics, or modern physics needs work
   - Chemistry: Check organic, inorganic, physical chemistry performance patterns
   - English: Assess vocabulary, comprehension, or grammar weaknesses
   - Computer Science (if applicable): Programming concepts, data structures, algorithms

3. PSYCHOLOGICAL FACTORS:
   - Address exam anxiety if many questions skipped
   - Confidence building if accuracy is high but coverage low
   - Focus improvement if many careless errors (low skip, low accuracy)

4. ACTIONABLE RECOMMENDATIONS:
   - Specific chapter/topic references for Pakistani curriculum
   - Study techniques matching their learning pattern
   - Time management strategies based on their pacing
   - Practice test strategy improvements

Provide analysis in this JSON format:
{
  "overallPerformance": "3-4 sentences analyzing their UNIQUE performance pattern, time management, and test-taking strategy. Reference specific percentages and patterns.",
  "strengths": [
    "Specific strength with evidence (e.g., 'Strong conceptual understanding in Physics mechanics - 85% accuracy on numerical problems')",
    "Another unique strength with data",
    "Third strength addressing their approach or consistency"
  ],
  "weaknesses": [
    "Specific weakness with evidence (e.g., 'Struggling with organic chemistry nomenclature - only 40% accuracy, suggesting concept gaps')",
    "Another weakness with root cause analysis",
    "Third weakness addressing patterns (rushing, uncertainty, etc.)"
  ],
  "studyRecommendations": [
    "Specific action: 'Focus on [specific topic] from [textbook chapter]. Practice [specific type] problems daily'",
    "Time-bound goal: 'Dedicate 45 minutes daily to [weak area] for 2 weeks'",
    "Resource recommendation: 'Use [specific resource] for [specific concept]'",
    "Practice strategy: 'Solve [number] problems of [type] under timed conditions'",
    "Review technique for their pattern"
  ],
  "priorityTopics": [
    "Most critical topic with reason (e.g., 'Quadratic Equations - foundational for 20% of Math section')",
    "Second priority topic",
    "Third priority topic",
    "Fourth priority if needed"
  ],
  "estimatedImprovement": "Realistic percentage improvement with timeline based on their current level and effort required. Be specific: 'With 2 hours daily focused practice, expect 15-20% improvement in weak subjects within 3 weeks, reaching [target]% overall'",
  "nextSteps": [
    "Immediate action (within 24 hours): 'Review incorrect answers and identify pattern'",
    "This week: 'Complete [specific] practice problems'",
    "Next 2 weeks: 'Build foundation in [weak areas]'",
    "Before next test: 'Take timed mock test on [topics]'"
  ]
}

IMPORTANT: 
- Use their EXACT statistics in your analysis
- Reference their specific accuracy percentages
- Tailor recommendations to ${testResult.testType} exam patterns
- Be encouraging but honest about areas needing improvement
- Provide concrete, actionable steps, not vague advice
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const feedback: AIFeedback = JSON.parse(jsonMatch[0]);
    return feedback;

  } catch (error) {
    console.error('Error generating AI feedback:', error);
    
    // Fallback feedback if API fails
    return {
      overallPerformance: `You scored ${testResult.accuracy.toFixed(1)}% on this ${testResult.testType} test. ${
        testResult.accuracy >= 75 ? 'Great job!' : testResult.accuracy >= 60 ? 'Good effort, but there\'s room for improvement.' : 'Focus on strengthening your fundamentals.'
      }`,
      strengths: Object.entries(testResult.subjectWisePerformance)
        .filter(([_, stats]) => stats.accuracy >= 70)
        .map(([subject]) => `Strong performance in ${subject}`),
      weaknesses: Object.entries(testResult.subjectWisePerformance)
        .filter(([_, stats]) => stats.accuracy < 60)
        .map(([subject]) => `Needs improvement in ${subject}`),
      studyRecommendations: [
        'Practice more questions in your weak subjects',
        'Review incorrect answers and understand the concepts',
        'Take regular mock tests to improve time management',
        'Focus on understanding rather than memorization'
      ],
      priorityTopics: testResult.weakTopics.slice(0, 3),
      estimatedImprovement: 'With consistent practice, you can improve by 10-15% in 2-3 weeks',
      nextSteps: [
        'Review this test and understand your mistakes',
        'Create a study schedule focusing on weak areas',
        'Take another practice test in 3 days'
      ]
    };
  }
}

export function calculateTestMetrics(testData: any) {
  const answers = testData.answers || [];
  const totalQuestions = answers.length;
  
  console.log('Calculating metrics for', totalQuestions, 'questions');
  console.log('First 3 answers:', answers.slice(0, 3));
  
  const correctAnswers = answers.filter((a: any) => a.isCorrect === true).length;
  const incorrectAnswers = answers.filter((a: any) => a.userAnswer !== null && !a.isCorrect).length;
  const skippedAnswers = answers.filter((a: any) => a.userAnswer === null || a.userAnswer === undefined).length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  console.log('Metrics:', { correctAnswers, incorrectAnswers, skippedAnswers, accuracy });

  // Calculate subject-wise performance
  const subjectWisePerformance: Record<string, { correct: number; total: number; accuracy: number }> = {};
  
  answers.forEach((answer: any) => {
    const subject = answer.subject || 'General';
    if (!subjectWisePerformance[subject]) {
      subjectWisePerformance[subject] = { correct: 0, total: 0, accuracy: 0 };
    }
    subjectWisePerformance[subject].total++;
    if (answer.isCorrect === true) {
      subjectWisePerformance[subject].correct++;
    }
  });

  // Calculate accuracy for each subject
  Object.keys(subjectWisePerformance).forEach(subject => {
    const stats = subjectWisePerformance[subject];
    stats.accuracy = (stats.correct / stats.total) * 100;
  });

  // Identify weak topics (subjects with < 60% accuracy)
  const weakTopics = Object.entries(subjectWisePerformance)
    .filter(([_, stats]) => stats.accuracy < 60)
    .map(([subject]) => subject);

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    skippedAnswers,
    accuracy,
    subjectWisePerformance,
    weakTopics
  };
}
