// app/api/webhook/paystack/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    console.log("🔥 WEBHOOK REACHED CODE! Event:", event.event);

    if (event.event === "charge.success") {
      const { courseId, userId, studentId } = event.data.metadata;

      await prisma.enrollment.create({
        data: {
          courseId,
          userId,
          studentId,
          status: "Active",
          amount: event.data.amount / 100,
          reference: event.data.reference,
        },
      });

      console.log("✅ DATABASE UPDATED!");
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
  return NextResponse.json({ message: "Ignored" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { origin } = new URL(req.url);
  // Redirect to our new success page
  return NextResponse.redirect(`${origin}/student/enrollment-success`);
}
