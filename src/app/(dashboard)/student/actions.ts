"use server";

import { randomBytes } from "crypto";
import { renderToStaticMarkup } from "react-dom/server";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { StudentApprovedEmail } from "@/emails/student-approved-email";
import { InstructorInviteEmail } from "@/emails/instructor-invite-email";
import type { InviteInstructorSchemaType } from "@/lib/zodSchema";

// ─── Shared return types ──────────────────────────────────────────────────────

export type ApproveStudentResult = {
  success: boolean;
  regNo?: string;
  error?: string;
};

export type InviteInstructorResult = {
  success: boolean;
  instructor?: { id: string; name: string; email: string; createdAt: Date };
  error?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateRegNo(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KEEK-${year}-${rand}`;
}

function generateInviteToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── Student Approval ────────────────────────────────────────────────────────

export async function approveStudentAction(
  studentId: string,
): Promise<ApproveStudentResult> {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: { select: { email: true } } },
    });

    if (!student) return { success: false, error: "Student not found." };
    if (student.status === "APPROVED") {
      return { success: false, error: "Student is already approved." };
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
      // Approval is already saved — log but don't roll back
      console.error("[approveStudentAction] Resend error:", mailError);
    }

    return { success: true, regNo };
  } catch (err: any) {
    const message = err?.message ?? "An unexpected error occurred.";
    console.error("[approveStudentAction] caught:", message);
    return { success: false, error: message };
  }
}

// ─── Instructor Invite ───────────────────────────────────────────────────────

export async function inviteInstructorAction(
  values: InviteInstructorSchemaType,
): Promise<InviteInstructorResult> {
  const { name, email, bio } = values;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // 1. Prevent duplicate invitations
    const existing = await prisma.instructor.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return {
        success: false,
        error: "An invitation has already been sent to this email address.",
      };
    }

    // 2. Create instructor record
    const instructor = await prisma.instructor.create({
      data: { email: normalizedEmail, bio },
    });

    // 3. Store invite token in the Verification table (no extra schema fields needed)
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

    // 4. Build invite URL and render email
    const inviteUrl =
      `${env.NEXT_PUBLIC_APP_URL}/sign-up` +
      `?token=${token}` +
      `&email=${encodeURIComponent(normalizedEmail)}` +
      `&role=INSTRUCTOR`;

    const html = renderToStaticMarkup(
      InstructorInviteEmail({ inviteUrl, expiresInHours: 48 }),
    );

    // 5. Send email — log full response for debugging
    const { data: mailData, error: mailError } = await resend.emails.send({
      from: "Keek Institute <onboarding@resend.dev>",
      to: normalizedEmail,
      subject: "You're invited to join Keek Institute as an Instructor",
      html,
    });

    console.log("[inviteInstructorAction] Resend response:", {
      mailData,
      mailError,
    });

    if (mailError) {
      // Roll back so the admin can retry cleanly
      await prisma.instructor.delete({ where: { id: instructor.id } });
      await prisma.verification.deleteMany({
        where: { identifier: `instructor-invite:${normalizedEmail}` },
      });
      return { success: false, error: `Email failed: ${mailError.message}` };
    }

    return {
      success: true,
      instructor: {
        id: instructor.id,
        name, // use form value — DB field may not exist yet
        email: instructor.email,
        createdAt: instructor.createdAt,
      },
    };
  } catch (err: any) {
    const message = err?.message ?? "An unexpected error occurred.";
    console.error("[inviteInstructorAction] caught:", message);
    return { success: false, error: message };
  }
}
