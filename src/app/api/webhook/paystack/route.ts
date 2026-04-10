import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    console.log("🔥 WEBHOOK REACHED! Event:", event.event);

    if (event.event === "charge.success") {
      await handleEnrollment(
        event.data.reference,
        event.data.metadata,
        event.data.amount,
      );
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
  return NextResponse.json({ message: "Ignored" }, { status: 200 });
}

// ← This is what the browser hits after payment
export async function GET(req: NextRequest) {
  const { origin, searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(`${origin}/student/enrollment-success`);
  }

  try {
    // Verify the transaction directly with Paystack
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await res.json();
    console.log("💳 Paystack verify response:", data.data?.status);

    if (data.data?.status === "success") {
      await handleEnrollment(reference, data.data.metadata, data.data.amount);
    }
  } catch (err) {
    console.error("❌ Callback verify error:", err);
  }

  return NextResponse.redirect(`${origin}/student/enrollment-success`);
}

// Shared logic — safe to call from both GET and POST
async function handleEnrollment(
  reference: string,
  metadata: { courseId: string; userId: string; studentId: string },
  amount: number,
) {
  const { courseId, userId, studentId } = metadata;

  // Prevent duplicate enrollments if both webhook + callback fire
  const existing = await prisma.enrollment.findFirst({
    where: { reference },
  });

  if (existing) {
    console.log("⚠️ Enrollment already exists for reference:", reference);
    return;
  }

  await prisma.enrollment.create({
    data: {
      courseId,
      userId,
      studentId,
      status: "Active",
      amount: amount / 100,
      reference,
    },
  });

  console.log("✅ DATABASE UPDATED for reference:", reference);
}
