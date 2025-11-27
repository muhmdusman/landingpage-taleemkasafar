"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InstructionsPage() {
  const router = useRouter();

  useEffect(() => {
    const testType = sessionStorage.getItem("testType");
    if (!testType) {
      router.push("/quiz"); // Redirect to test type selection
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          University Entry Test Simulator
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          This simulator contains 200 multiple choice questions divided into
          three sections. You have 3 hours to complete the test.
        </p>

        <div className="grid gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="font-semibold text-lg mb-2">Test Structure</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Section 1: Mathematics - 100 questions</li>
              <li>Section 2: Physics - 60 questions</li>
              <li>Section 3: English - 40 questions</li>
              <li>Total Time: 3 hours</li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h2 className="font-semibold text-lg mb-2">Instructions</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Each question carries 1 mark</li>
              <li>There is no negative marking</li>
              <li>Select an option and click "Save" to record your answer</li>
              <li>You can mark questions for review</li>
              <li>
                Use the dropdown to filter unattempted or review questions
              </li>
              <li>The test will auto-submit when time expires</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/quiz/start-test">
            <Button
              size="lg"
              className="px-8"
              onClick={() => {
                sessionStorage.setItem("instructionsViewed", "true");
                window.location.href = "/quiz/start-test";
              }}
            >
              Start Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
