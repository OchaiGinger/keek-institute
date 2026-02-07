import prisma from "@/lib/prisma";

export async function getIndividualCourse(slug: string) {
  const data = await prisma.course.findUnique({
    where: {
      slug,
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
      chapters: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  return data;
}

export type publicCourseType = Awaited<ReturnType<typeof getIndividualCourse>>;
