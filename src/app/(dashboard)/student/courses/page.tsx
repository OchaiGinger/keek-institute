import { getEnrolledCourses } from "@/app/data/student/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const StudentCoursesPage = async () => {
  const enrollments = await getEnrolledCourses();

  if (enrollments.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <IconBook className="size-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">No courses yet</h1>
        <p className="max-w-sm text-muted-foreground">
          You haven't enrolled in any courses. Browse our catalog to get
          started.
        </p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            You have {enrollments.length} enrolled course
            {enrollments.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/courses">Browse More</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {enrollments.map(({ enrollmentId, course, enrolledAt }) => (
          <Card
            key={enrollmentId}
            className="group overflow-hidden p-0 transition-all duration-200 hover:shadow-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            <CardContent className="space-y-4 p-5">
              <div className="space-y-1">
                <h2 className="line-clamp-2 text-lg font-semibold leading-snug">
                  {course.title}
                </h2>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.smallDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <IconChartBar className="size-3" />
                  {course.level}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <IconCategory className="size-3" />
                  {course.category}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <IconClock className="size-3" />
                  {course.duration}h
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IconBook className="size-4" />
                  {course.totalChapters} chapters · {course.totalLessons}{" "}
                  lessons
                </span>
                <span>
                  {new Date(enrolledAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <Button asChild className="w-full gap-2">
                <Link href={`/student/courses/${course.slug}/learn`}>
                  <IconPlayerPlay className="size-4" />
                  Continue Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
