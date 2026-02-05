"use server";

import { requireInstructor } from "@/app/data/instructor/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  await requireInstructor();

  try {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    revalidatePath("/instructor/courses");
    return {
      status: "success",
      message: "Course deleted successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An error occurred while deleting the course.",
    };
  }
}
