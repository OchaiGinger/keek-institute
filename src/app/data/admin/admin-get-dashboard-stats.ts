import prisma from "@/lib/prisma";
import { requireInstructor } from "../instructor/require-admin";

export async function adminGetDashboardStats() {
  const [totalSignups, totalCustomers, totaCourses, totalLessons] =
    await Promise.all([
      prisma.student.count(),
      prisma.student.count({
        where: {
          enrollment: {
            some: {},
          },
        },
      }),
      prisma.course.count(),
      prisma.lesson.count(),
    ]);

  return {
    totalCustomers,
    totalSignups,
    totaCourses,
    totalLessons,
  };
}
