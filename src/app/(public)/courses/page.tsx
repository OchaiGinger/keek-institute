import { getCourses } from "@/app/data/course/get-courses";
import React, { Suspense } from "react";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/public-courseCard";

const PublicCourseRoute = () => {
  return (
    <div className="mt-5">
      <div className="flex flex-col  space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Course
        </h1>
        <p className="text-muted-foreground ">
          Discover our wide range of courses designed to help you achieve you
          learning goals
        </p>
      </div>
      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};

export default PublicCourseRoute;

async function RenderCourses() {
  const courses = await getCourses();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard data={course} key={course.id} />
      ))}
    </div>
  );
}

async function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PublicCourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
