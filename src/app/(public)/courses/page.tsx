import React, { Suspense } from "react";
import { getCourses } from "@/app/data/course/get-courses";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/public-courseCard";
import { CoursesErrorBoundary } from "@/components/courses-error-boundary";
import { Button } from "@/components/ui/button";

const PublicCourseRoute = () => {
  return (
    <div className="mt-5">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>

      <CoursesErrorBoundary>
        {" "}
        {/* ← no function props, just children */}
        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </CoursesErrorBoundary>
    </div>
  );
};
export default PublicCourseRoute;

async function RenderCourses() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
        <p className="text-lg font-medium">No courses available yet</p>
        <p className="text-muted-foreground text-sm">Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

// ✅ NOT async
function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
