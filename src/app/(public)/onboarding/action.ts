// onboarding/action.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeOnboardingAction(data: any) {
  console.log("--- ACTION START ---");
  console.log("Received Data:", JSON.stringify(data, null, 2));

  try {
    // Validation: Ensure studentId exists
    if (!data.studentId || data.studentId === "TEMP") {
      return { success: false, error: "Invalid Student ID. Please refresh." };
    }

    const updateResult = await prisma.student.update({
      where: { id: data.studentId },
      data: {
        profilePhotoKey: data.photoKey,
        onboarded: true,
        // Ensure this is a plain object, not a string or a complex class
        assessmentResults: JSON.parse(JSON.stringify(data.assessmentResults)),
        status: "PENDING",
      },
    });

    console.log("Database Update Success:", updateResult.id);

    revalidatePath("/student");
    return { success: true };
  } catch (error: any) {
    // This will catch the Prisma error you're seeing in the logs
    console.error("PRISMA ERROR:", error.message);
    return { success: false, error: error.message || "Database update failed" };
  }
}
