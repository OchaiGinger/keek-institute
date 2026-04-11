"use server";

import { randomBytes } from "crypto";
import { renderToStaticMarkup } from "react-dom/server";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { StudentApprovedEmail } from "@/emails/student-approved-email";
import { InstructorInviteEmail } from "@/emails/instructor-invite-email";
import type { InviteInstructorSchemaType } from "@/lib/zodSchema";

// ─── Return types ─────────────────────────────────────────────────────────────

export type ApproveStudentResult =
  | { success: true; regNo: string }
  | { success: false; error: string };

// This is the specific type your Modal is looking for
export type InviteInstructorResult =
  | {
      success: true;
      id: string;
      name: string;
      email: string;
      createdAt: string;
    }
  | { success: false; error: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateRegNo(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KEEK-${year}-${rand}`;
}

function generateInviteToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── Student Approval ─────────────────────────────────────────────────────────

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

    if (student.status === "APPROVED") {
      return { success: false, error: "Student is already approved." } as const;
    }

    const regNo = student.registrationNumber ?? generateRegNo();

    await prisma.student.update({
      where: { id: studentId },
      data: { status: "APPROVED", onboarded: true, registrationNumber: regNo },
    });

    const html = renderToStaticMarkup(
      StudentApprovedEmail({
        studentName: `${student.firstName} ${student.lastName}`,
        registrationNumber: regNo,
        dashboardUrl: `${env.NEXT_PUBLIC_APP_URL}/student`,
      }),
    );

    const { error: mailError } = await resend.emails.send({
      from: "Keek Institute <onboarding@resend.dev>",
      to: student.user.email,
      subject: "🎉 Your Keek Institute Account is Approved!",
      html,
    });

    if (mailError) {
      console.error("[approveStudentAction] Resend error:", mailError);
    }

    return { success: true, regNo } as const;
  } catch (err: any) {
    const message = err?.message ?? "An unexpected error occurred.";
    return { success: false, error: message } as const;
  }
}

// ─── Instructor Invite ────────────────────────────────────────────────────────

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
      return {
        success: false,
        error: "An invitation has already been sent to this email address.",
      } as const;
    }

    const newInstructor = await prisma.instructor.create({
      data: { email: normalizedEmail, bio, name },
    });

    const token = generateInviteToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    await prisma.verification.create({
      data: {
        id: randomBytes(16).toString("hex"),
        identifier: `instructor-invite:${normalizedEmail}`,
        value: token,
        expiresAt,
      },
    });

    const inviteUrl =
      `${env.NEXT_PUBLIC_APP_URL}/sign-up` +
      `?token=${token}` +
      `&email=${encodeURIComponent(normalizedEmail)}` +
      `&role=INSTRUCTOR`;

    const html = renderToStaticMarkup(
      InstructorInviteEmail({ inviteUrl, expiresInHours: 48 }),
    );

    const { error: mailError } = await resend.emails.send({
      from: "Keek Institute <onboarding@resend.dev>",
      to: normalizedEmail,
      subject: "You're invited to join Keek Institute as an Instructor",
      html,
    });

    if (mailError) {
      await prisma.instructor.delete({ where: { id: newInstructor.id } });
      return {
        success: false,
        error: `Email failed: ${mailError.message}`,
      } as const;
    }

    return {
      success: true,
      id: newInstructor.id,
      name: newInstructor.name ?? "",
      email: newInstructor.email,
      createdAt: newInstructor.createdAt.toISOString(),
    } as const;
  } catch (err: any) {
    const message = err?.message ?? "An unexpected error occurred.";
    return { success: false, error: message } as const;
  }
}
