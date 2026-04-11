"use server";

import { randomBytes } from "crypto";
import { render } from "@react-email/render";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { env } from "@/lib/env";
import { StudentApprovedEmail } from "@/emails/student-approved-email";
import { InstructorInviteEmail } from "@/emails/instructor-invite-email";
import type { InviteInstructorSchemaType } from "@/lib/zodSchema";

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

export async function approveStudentAction(studentId: string): Promise<{
  success: boolean;
  regNo?: string;
  error?: string;
}> {
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
      data: {
        status: "APPROVED",
        onboarded: true,
        registrationNumber: regNo,
      },
    });

    const dashboardUrl = `${env.NEXT_PUBLIC_APP_URL}/student`;

    const html = await render(
      StudentApprovedEmail({
        studentName: `${student.firstName} ${student.lastName}`,
        registrationNumber: regNo,
        dashboardUrl,
      }),
    );

    const { error: mailError } = await resend.emails.send({
      from: "Keek Institute <no-reply@yourdomain.com>",
      to: student.user.email,
      subject: "🎉 Your Keek Institute Account is Approved!",
      html,
    });

    if (mailError) {
      // Approval is saved — don't roll back. Just log it.
      console.error("[approveStudentAction] Resend error:", mailError);
    }

    return { success: true, regNo };
  } catch (err) {
    console.error("[approveStudentAction]", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

// ─── Instructor Invite ───────────────────────────────────────────────────────

export async function inviteInstructorAction(
  values: InviteInstructorSchemaType,
): Promise<{
  success: boolean;
  instructor?: { id: string; name: string; email: string; createdAt: Date };
  error?: string;
}> {
  const { name, email, bio } = values;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Prevent duplicate invitations
    const existing = await prisma.instructor.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return {
        success: false,
        error: "An invitation has already been sent to this email address.",
      };
    }

    // Generate a secure 48-hour invite token.
    // We reuse the existing `Verification` model — no schema changes for tokens.
    const token = generateInviteToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    // Run both writes in a transaction so they succeed or fail together
    const [instructor] = await prisma.$transaction([
      prisma.instructor.create({
        data: {
          email: normalizedEmail,
          name, // requires `name String?` added to Instructor model
          bio,
        },
      }),
      prisma.verification.create({
        data: {
          id: randomBytes(16).toString("hex"),
          identifier: `instructor-invite:${normalizedEmail}`,
          value: token,
          expiresAt,
        },
      }),
    ]);

    const inviteUrl =
      `${env.NEXT_PUBLIC_APP_URL}/sign-up` +
      `?token=${token}` +
      `&email=${encodeURIComponent(normalizedEmail)}` +
      `&role=INSTRUCTOR`;

    const html = await render(
      InstructorInviteEmail({ inviteUrl, expiresInHours: 48 }),
    );

    const { error: mailError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: normalizedEmail,
      subject: "You're invited to join Keek Institute as an Instructor",
      html,
    });

    if (mailError) {
      // Roll back both records so the admin can retry
      console.error("[inviteInstructorAction] Resend error:", mailError);
      await prisma.$transaction([
        prisma.instructor.delete({ where: { id: instructor.id } }),
        prisma.verification.deleteMany({
          where: { identifier: `instructor-invite:${normalizedEmail}` },
        }),
      ]);
      return {
        success: false,
        error: "Failed to send invitation email. Please try again.",
      };
    }

    return {
      success: true,
      instructor: {
        id: instructor.id,
        name: instructor.name ?? name,
        email: instructor.email,
        createdAt: instructor.createdAt,
      },
    };
  } catch (err) {
    console.error("[inviteInstructorAction]", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
