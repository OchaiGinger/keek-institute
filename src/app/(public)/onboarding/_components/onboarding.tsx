"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Student } from "@/lib/types";
import { completeOnboardingAction } from "../action";
import PhotoStep from "./photo-step";
import IDCardStep from "./idCard-setup";
import AssessmentStep from "./assessment-setup";

interface OnboardingProps {
  student: Student;
}

export default function Onboarding({ student }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profilePhotoKey, setProfilePhotoKey] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  // Generate a temporary visual ID for the card preview
  const visualRegNo =
    student.registrationNumber ||
    `Creed/TEMP/${student.id?.slice(0, 5).toUpperCase()}`;

  // Inside your Parent Component
  const handleComplete = async (quizResult: any) => {
    setIsSubmitting(true);

    try {
      console.log("Saving to DB...", quizResult);

      // 1. Trigger the Server Action
      const response = await completeOnboardingAction({
        studentId: student.id, // Ensure this ID is valid!
        photoKey: profilePhotoKey,
        assessmentResults: quizResult,
      });

      if (response.success) {
        toast.success("Assessment saved! Redirecting...");
        // 2. Use window.location for a hard redirect to clear state
        window.location.href = "/student/dashboard";
      } else {
        // This will catch the Database Disconnect error we saw
        console.error("Action failed:", response.error);
        toast.error(`Save failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Critical error in handleComplete:", error);
      toast.error("A connection error occurred. Please check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900">
              Account Onboarding
            </h1>
            <span className="text-sm font-medium text-slate-500">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <PhotoStep
            onNext={() => setStep(2)}
            onChange={setProfilePhotoKey}
            value={profilePhotoKey}
          />
        )}

        {step === 2 && (
          <IDCardStep
            // Pass the student with the temporary reg number for display
            student={{ ...student, registrationNumber: visualRegNo }}
            photoKey={profilePhotoKey}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <AssessmentStep
            isSubmitting={isSubmitting}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
