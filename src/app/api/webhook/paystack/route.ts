import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  // 1. Verify the request is actually from Paystack
  if (hash !== req.headers.get("x-paystack-signature")) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  // 2. Handle successful payment
  if (event.event === "charge.success") {
    const { courseId, userId } = event.data.metadata;

    // 3. Update your database to "Enroll" the student
    await prisma.enrollment.create({
      data: {
        courseId: courseId,
        studentId: userId,
        status: "Active",
        amount: event.data.amount / 100, // Convert back from Kobo/Cents
        reference: event.data.reference,
      },
    });

    return new NextResponse("Success", { status: 200 });
  }

  return new NextResponse("Event ignored", { status: 200 });
}
