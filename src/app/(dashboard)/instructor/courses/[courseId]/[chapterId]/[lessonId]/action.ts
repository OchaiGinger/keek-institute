"use server";

import { requireInstructor } from "@/app/data/instructor/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { LessonSchema, LessonSchemaType } from "@/lib/zodSchema";

export async function updateLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  await requireInstructor();

  try {
    const result = LessonSchema.safeParse(values);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalid lesson data!",
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        videoKey: result.data.videoFileKey,
        thumbnailKey: result.data.thumbnailKey,
      },
    });

    return {
      status: "success",
      message: "Lesson updated successfully!",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update Course!",
    };
  }
}
