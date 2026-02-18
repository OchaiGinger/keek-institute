"use server";

import { requireUser } from "@/app/data/student/require-user";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";

export async function enrollInCourseAction(
  courseId: string,
): Promise<ApiResponse> {
  const user = await requireUser();

  try {
    // 1. Fetch Course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true, title: true, price: true },
    });

    if (!course) return { status: "error", message: "Course Not Found!" };

    // 2. Check if student already has an ACTIVE enrollment
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        courseId: course.id,
        userId: user.id,
        status: "Active", // Match your EnrollmentStatus enum
      },
    });

    if (existingEnrollment) {
      return {
        status: "error",
        message: "You are already enrolled in this course.",
      };
    }

    // 3. Find Student profile
    const student = await prisma.student.findUnique({
      where: { userId: user.id },
      select: { id: true, paystackCustomerId: true },
    });

    if (!student) {
      return {
        status: "error",
        message: "Please complete your student profile registration first.",
      };
    }

    let paystackCustomerId = student.paystackCustomerId;

    // 4. Create Paystack Customer if missing
    if (!paystackCustomerId) {
      const customerRes = await fetch("https://api.paystack.co/customer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          first_name: user.name.split(" ")[0] || "",
          last_name: user.name.split(" ")[1] || "",
        }),
      });

      const customerData = await customerRes.json();
      if (!customerData.status)
        throw new Error("Paystack customer creation failed");

      paystackCustomerId = customerData.data.customer_code;

      await prisma.student.update({
        where: { userId: user.id },
        data: { paystackCustomerId },
      });
    }

    // 5. Initialize Paystack Transaction
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
          amount: course.price * 100,
          callback_url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/webhook/paystack`,
          metadata: {
            courseId: course.id,
            userId: user.id,
            studentId: student.id,
          },
        }),
      },
    );

    const checkoutData = await checkoutRes.json();
    if (!checkoutData.status) throw new Error(checkoutData.message);

    return {
      status: "success",
      message: checkoutData.data.authorization_url,
    };
  } catch (error) {
    console.error("DETAILED PAYSTACK ERROR:", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Payment initialization failed.",
    };
  }
}
