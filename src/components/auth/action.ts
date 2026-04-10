// action.ts
"use server";

import prisma from "@/lib/prisma";

// Called after login — check if student has completed onboarding
export async function checkStudentOnboardingAction(userId: string) {
  const student = await prisma.student.findUnique({
    where: { userId },
    select: { id: true },
  });

  return { isOnboarded: !!student, valid: true };
}

// Called before login — validate registration number matches email
export async function validateRegistrationNumber(
  email: string,
  registrationNumber: string,
) {
  const student = await prisma.student.findFirst({
    where: {
      registrationNumber,
      user: { email },
    },
  });

  return { valid: !!student };
}
