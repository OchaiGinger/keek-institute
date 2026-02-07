"use server";

import prisma from "@/lib/prisma";
import { InviteInstructorSchemaType } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export async function approveStudentAction(studentId: string) {
  try {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const regNo = `NG-${year}-${random}`;

    // Update student record
    await prisma.student.update({
      where: { id: studentId },
      data: {
        status: "APPROVED",
        registrationNumber: regNo,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, regNo };
  } catch (error) {
    console.error("Approval error:", error);
    return { success: false };
  }
}

export async function inviteInstructorAction(
  values: InviteInstructorSchemaType,
) {
  try {
    // Check if instructor already exists
    const existing = await prisma.instructor.findUnique({
      where: { email: values.email },
    });

    if (existing) {
      return {
        success: false,
        error: "Instructor with this email already exists.",
      };
    }

    // Create the instructor record
    // userId will be null until they sign up with this email
    await prisma.instructor.create({
      data: {
        email: values.email,
        bio: values.bio,
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create instructor" };
  }
}
