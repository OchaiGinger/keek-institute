import { requireUser } from "@/app/data/student/require-user";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getLearningCourse(slug: string) {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              videoKey: true,
              position: true,
            },
          },
        },
      },
      enrollments: {
        where: { userId: user.id, status: "Active" },
        select: { id: true },
      },
    },
  });

  if (!course) redirect("/student");

  // Guard — must be enrolled
  if (course.enrollments.length === 0) redirect(`/courses/${slug}`);

  const firstLesson = course.chapters[0]?.lessons[0] ?? null;

  return {
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      chapters: course.chapters,
      totalLessons: course.chapters.reduce(
        (sum, ch) => sum + ch.lessons.length,
        0,
      ),
    },
    firstLesson,
    bucketUrl: `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.t3.tigrisfiles.io`,
  };
}

export type LearningCourse = Awaited<ReturnType<typeof getLearningCourse>>;
