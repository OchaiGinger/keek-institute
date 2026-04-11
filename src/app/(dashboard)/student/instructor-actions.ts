"use server";

import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { InstructorInvitedEmail } from "@/emails/instructor-invited-email";
import { env } from "@/lib/env";
import { renderToStaticMarkup } from "react-dom/server";

export async function inviteInstructorAction(data: {
  name: string;
  email: string;
}) {
  try {
    // Check if already invited
    const existing = await prisma.instructor.findUnique({
      where: { email: data.email },
    });
    if (existing) return { success: false, message: "Already invited" };

    await prisma.instructor.create({
      data: { email: data.email },
    });

    // The signup URL — instructor must sign up with this exact email
    const signupUrl = `${env.NEXT_PUBLIC_APP_URL}/auth/signup`;

    await resend.emails.send({
      from: "Keek Institute <no-reply@yourdomain.com>", // ← swap with verified domain
      to: data.email,
      subject: "You're invited to teach at Keek Institute",
      html: renderToStaticMarkup(
        InstructorInvitedEmail({
          instructorName: data.name,
          email: data.email,
          signupUrl,
        }),
      ),
    });

    return { success: true };
  } catch (err) {
    console.error("Invite instructor error:", err);
    return { success: false, message: "Something went wrong" };
  }
}
