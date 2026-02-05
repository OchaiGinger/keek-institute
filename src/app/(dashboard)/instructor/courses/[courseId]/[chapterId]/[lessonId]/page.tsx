import { InstructorGetLesson } from "@/app/data/instructor/get-lesson";
import React from "react";
import { LessonForm } from "./_components/lesson-form";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

const LessonIdPage = async ({ params }: { params: Params }) => {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await InstructorGetLesson(lessonId);

  return (
    <div>
      <LessonForm chapterId={chapterId} data={lesson} courseId={courseId} />
    </div>
  );
};

export default LessonIdPage;
