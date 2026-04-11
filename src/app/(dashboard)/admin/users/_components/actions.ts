"use server";

import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { revalidatePath } from "next/cache";
import { InstructorInviteEmail } from "@/emails/instructor-invite-email";
import { StudentApprovedEmail } from "@/emails/student-approved-email"; // Ensure this is imported
import type { InviteInstructorSchemaType } from "@/lib/zodSchema";

// ─── Return Types ─────────────────────────────────────────────────────────────

export type InviteInstructorResult =
  | {
      success: true;
      id: string;
      name: string;
      email: string;
      createdAt: string;
    }
  | { success: false; error: string };

export type ApproveStudentResult =
  | { success: true; regNo: string }
  | { success: false; error: string };

// ─── Student Approval Action ──────────────────────────────────────────────────

export async function approveStudentAction(
  studentId: string,
): Promise<ApproveStudentResult> {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: { select: { email: true } } },
    });

    if (!student)
      return { success: false, error: "Student not found." } as const;

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const regNo = `NG-${year}-${random}`;

    await prisma.student.update({
      where: { id: studentId },
      data: { status: "APPROVED", registrationNumber: regNo },
    });

    // Send email using the 'react' property instead of rendering to string
    await resend.emails.send({
      from: "Keek Institute <onboarding@resend.dev>",
      to: student.user.email,
      subject: "🎉 Your Account is Approved!",
      react: StudentApprovedEmail({
        studentName: `${student.firstName} ${student.lastName}`,
        registrationNumber: regNo,
        dashboardUrl: `${env.NEXT_PUBLIC_APP_URL}/student`,
      }),
    });

    revalidatePath("/admin/users");
    return { success: true, regNo } as const;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to approve student",
    } as const;
  }
}

// ─── Instructor Invite Action ─────────────────────────────────────────────────

export async function inviteInstructorAction(
  values: InviteInstructorSchemaType,
): Promise<InviteInstructorResult> {
  const { name, email, bio } = values;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existing = await prisma.instructor.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return { success: false, error: "Instructor already exists." } as const;
    }

    const newInstructor = await prisma.instructor.create({
      data: { email: normalizedEmail, bio, name },
    });

    const token = randomBytes(32).toString("hex");
    const inviteUrl = `${env.NEXT_PUBLIC_APP_URL}/sign-up?token=${token}&email=${encodeURIComponent(normalizedEmail)}&role=INSTRUCTOR`;

    const { error: mailError } = await resend.emails.send({
      from: "Keek Institute <onboarding@resend.dev>",
      to: normalizedEmail,
      subject: "Invitation to join Keek Institute",
      // Use 'react' property here too
      react: InstructorInviteEmail({ inviteUrl, expiresInHours: 48 }),
    });

    if (mailError) {
      await prisma.instructor.delete({ where: { id: newInstructor.id } });
      return { success: false, error: mailError.message } as const;
    }

    revalidatePath("/admin/users");

    return {
      success: true,
      id: newInstructor.id,
      name: newInstructor.name ?? "",
      email: newInstructor.email,
      createdAt: newInstructor.createdAt.toISOString(),
    } as const;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    } as const;
  }
}
