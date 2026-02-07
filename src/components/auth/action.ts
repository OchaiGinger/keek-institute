"use server";

import prisma from "@/lib/prisma";

export async function checkStudentOnboardingAction(userId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      select: { onboarded: true },
    });

    return {
      isOnboarded: student?.onboarded ?? false,
    };
  } catch (error) {
    console.error("Onboarding check error:", error);
    return { isOnboarded: false };
  }
}
