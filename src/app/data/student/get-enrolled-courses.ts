import { requireUser } from "@/app/data/student/require-user";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";

export async function getEnrolledCourses() {
  const user = await requireUser();

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      Course: {
        select: {
          id: true,
          title: true,
          smallDescription: true,
          fileKey: true,
          slug: true,
          level: true,
          duration: true,
          category: true,
          chapters: {
            select: {
              lessons: { select: { id: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return enrollments.map((e) => ({
    enrollmentId: e.id,
    amount: e.amount,
    enrolledAt: e.createdAt,
    course: {
      ...e.Course,
      thumbnailUrl: `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.t3.storage.dev/${e.Course.fileKey}`,
      totalLessons: e.Course.chapters.reduce(
        (sum, ch) => sum + ch.lessons.length,
        0,
      ),
      totalChapters: e.Course.chapters.length,
    },
  }));
}
