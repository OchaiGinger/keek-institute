import prisma from "@/lib/prisma";

export async function getCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      slug: true,
      smallDescription: true,
      category: true,
      level: true,
      price: true,
      duration: true,
    },
  });
  return data;
}

export type publicCourseType = Awaited<ReturnType<typeof getCourses>>[0];
