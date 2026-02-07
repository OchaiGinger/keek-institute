import { getIndividualCourse } from "@/app/data/course/get-course";
import { RenderDescription } from "@/components/rich-text-editor/render-discription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { env } from "@/lib/env";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};
const SlugPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const course = await getIndividualCourse(slug);
  if (!course) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <p className="text-muted-foreground">
          The slug "{slug}" does not exist in our database.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video rounded-lg overflow-hidden w-full shadow-lg">
          <Image
            src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.t3.storage.dev/${course?.fileKey}`}
            alt={course.title}
            fill
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="spac-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {course?.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground line-clamp-2">
              {course.smallDescription}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 ">
          <Badge className="flex items-center gap-1 px-3 py-1">
            <IconChartBar className="size-4" />
            <span>{course.level}</span>
          </Badge>

          <Badge className="flex items-center gap-1 px-3 py-1">
            <IconCategory className="size-4" />
            <span>{course.category}</span>
          </Badge>

          <Badge className="flex items-center gap-1 px-3 py-1">
            <IconClock className="size-4" />
            <span>{course.duration}hours</span>
          </Badge>
        </div>
        <Separator className="my-8" />

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            Course Description
          </h2>
          <div>
            <RenderDescription
              json={JSON.parse(course.description as string)}
            />
          </div>
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Course Content
              </h2>
              <div>
                {course.chapters.length} chapters |{" "}
                {course.chapters.reduce(
                  (total, chapter) => total + (chapter.lessons.length || 0),
                  0,
                )}{" "}
                Lessons
              </div>
            </div>
            <div className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <Card className="p-0 overflow-hidden translate-all border-2 hover:shadow-md duration-200 gap-0">
                    <CollapsibleTrigger>
                      <div>
                        <CardContent className="p-6 hover:bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="flex size-10 items-center justify-center rounded-full bg-primary/10  text-primary font-semibold">
                                {index + 1}
                              </p>
                              <div className="">
                                <h3 className="text-xl font-semibold text-left">
                                  {chapter.title}
                                </h3>
                                <p className="text-sm mt-1 text-left text-muted-foreground">
                                  {chapter.lessons.length} lesson
                                  {chapter.lessons.length > 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className=" text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-semibold">
                                {chapter.lessons.length} Lessons
                              </Badge>
                              <IconChevronDown className="size-5 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-0">
                      <div className="border-t bg-muted/50 rounded-b-md ">
                        <div className="p-6 pt-4 space-y-3">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 hover:bg-accent p-3 rounded-lg group cursor-pointer transition-colors"
                            >
                              <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                                <IconPlayerPlay className="size-4 text-primary group-hover:text-primary/80" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Lesson {lessonIndex + 1}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="order-2 md:order-1 md:col-span-1">
        <div className="sticky top-20">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2 flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Price</span>
                <span className="font-semibold text-2xl text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NGN",
                  }).format(course.price)}
                </span>
              </div>

              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">What you will get:</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 gap-2 justify-center rounded-full bg-primary/10 text-primary">
                      <IconClock className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration </p>

                      <p className="text-sm text-muted-foreground">
                        {course.duration} hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 gap-2 justify-center rounded-full bg-primary/10 text-primary">
                      <IconChartBar className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Level </p>

                      <p className="text-sm text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 gap-2 justify-center rounded-full bg-primary/10 text-primary">
                      <IconCategory className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Category </p>

                      <p className="text-sm text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 gap-2 justify-center rounded-full bg-primary/10 text-primary">
                      <IconBook className="size-4" />
                    </div>
                    <div>
                      {course.chapters.length} chapters |{" "}
                      {course.chapters.reduce(
                        (total, chapter) =>
                          total + (chapter.lessons.length || 0),
                        0,
                      )}{" "}
                      Lessons
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4>This course includes:</h4>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <IconCheck className="size-4" />
                    </div>
                    <p className="text-sm">Full lifetime access</p>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <IconCheck className="size-4" />
                    </div>
                    <p className="text-sm">Acccess on mobile and desktop</p>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <IconCheck className="size-4" />
                    </div>
                    <p className="text-sm">Certificate of completion</p>
                  </li>
                </ul>
              </div>

              <Button className="w-full justify-center" size="lg">
                Enroll Now!
              </Button>
              <p className="mt-3  text-center text-muted-foreground text-xs">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SlugPage;
