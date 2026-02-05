import { instructorGetCourses } from "@/app/data/instructor/instructor-get-courses";
import { buttonVariants } from "@/components/ui/button";
import { get } from "http";
import Link from "next/link";
import {
  InstructorCourseCard,
  InstructorCourseCardSkeleton,
} from "./_components/InstructorCourseCard";
import { EmptyState } from "../../empty-state";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href="/instructor/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>
      <Suspense fallback={<InstructorCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  );
};

export default CoursesPage;

async function RenderCourses() {
  const data = await instructorGetCourses();
  return (
    <>
      {data.length == 0 ? (
        <EmptyState
          title={"No Courses Found"}
          description="Create a new course to get started"
          buttonText="Create Course"
          href="/instructor/courses/create"
        />
      ) : (
        <div className="mt-8 space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((course) => (
            <InstructorCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}

function InstructorCourseCardSkeletonLayout() {
  return (
    <div className="mt-8 space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <InstructorCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
