"use client";

import React, { useState } from "react";
import { evaluateAssessment } from "../geminiService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ASSESSMENT_QUESTIONS } from "@/constants/questions";

export default function AssessmentStep({ onComplete, isSubmitting }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === ASSESSMENT_QUESTIONS.length - 1;
  const progress = ((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  // Check if current question is answered
  const isCurrentAnswered = !!answers[currentQuestion.id];

  const handleNext = () => {
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAssessment = async () => {
    setLoading(true);
    try {
      const result = await evaluateAssessment(answers);
      console.log("AI result:", result);

      // Add this to see if the AI actually returned anything
      if (!result || !result.recommendedPath) {
        throw new Error("AI failed to generate a path");
      }

      await onComplete(result);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "AI service failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4">
      {/* Top Header & Progress */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Question {currentIndex + 1} of {ASSESSMENT_QUESTIONS.length}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-1.5 mb-8" />

        {/* Question Area */}
        <div
          key={currentQuestion.id}
          className="animate-in fade-in slide-in-from-right-4 duration-500"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
            {currentQuestion.question}
          </h2>

          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={(value) =>
              setAnswers({ ...answers, [currentQuestion.id]: value })
            }
            className="grid grid-cols-1 gap-4"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.text}
                onClick={() =>
                  setAnswers({ ...answers, [currentQuestion.id]: option.text })
                }
                className={`group flex items-center space-x-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  answers[currentQuestion.id] === option.text
                    ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100"
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <RadioGroupItem
                  value={option.text}
                  id={`opt-${option.text}`}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    answers[currentQuestion.id] === option.text
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-slate-300"
                  }`}
                >
                  {answers[currentQuestion.id] === option.text && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <Label
                  htmlFor={`opt-${option.text}`}
                  className="flex-grow cursor-pointer text-slate-700 text-lg font-medium group-hover:text-slate-900"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t pt-8">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || loading}
          className="text-slate-500"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleAssessment}
            disabled={!isCurrentAnswered || loading || isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 rounded-xl"
          >
            {loading ? (
              "Analyzing..."
            ) : (
              <>
                Submit Assessment <CheckCircle2 className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-xl"
          >
            Next Question <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
