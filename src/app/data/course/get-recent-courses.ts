import prisma from "@/lib/prisma";

export async function getRecentCourses(limit = 3) {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      title: true,
      smallDescription: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
          chapters: true,
        },
      },
    },
  });

  return courses;
}

export type RecentCourse = Awaited<ReturnType<typeof getRecentCourses>>[number];
