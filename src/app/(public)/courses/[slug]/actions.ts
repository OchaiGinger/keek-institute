"use server";

import { requireUser } from "@/app/data/student/require-user";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse> {
  const user = await requireUser();

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });

    if (!course) return { status: "error", message: "Course Not Found!" };

    // 1. Get or Create Paystack Customer
    let paystackCustomerId: string;
    const student = await prisma.student.findUnique({
      where: { id: user.id },
      select: { paystackCustomerId: true, registrationNumber: true },
    });

    if (student?.paystackCustomerId) {
      paystackCustomerId = student.paystackCustomerId;
    } else {
      // Create customer on Paystack
      const customerRes = await fetch("https://api.paystack.co/customer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const customerData = await customerRes.json();
      paystackCustomerId = customerData.data.customer_code;

      await prisma.student.update({
        where: { id: user.id },
        data: { paystackCustomerId },
      });
    }

    // 2. Initialize Transaction
    const checkoutRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: course.price * 100, // Paystack expects amount in Kobo/Cents
          callback_url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/webhook/paystack`,
          metadata: {
            courseId: course.id,
            userId: user.id,
          },
        }),
      },
    );

    const checkoutData = await checkoutRes.json();

    if (!checkoutData.status) {
      throw new Error(checkoutData.message);
    }

    // 3. Return the authorization URL to the client
    return {
      status: "success",
      message: checkoutData.data.authorization_url,
    };
  } catch (error) {
    console.error("Paystack Error:", error);
    return {
      status: "error",
      message: "Payment initialization failed.",
    };
  }
}
