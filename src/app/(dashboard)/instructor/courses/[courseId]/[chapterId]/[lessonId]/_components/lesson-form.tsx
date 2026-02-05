"use client";

import { InstructorLessonType } from "@/app/data/instructor/get-lesson";
import { Uploader } from "@/components/file-upload/uploader";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import {
  CourseSchemaType,
  LessonSchema,
  LessonSchemaType,
} from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateLesson } from "../action";

interface iAppProps {
  data: InstructorLessonType;
  chapterId: string;
  courseId: string;
}
export const LessonForm = ({ chapterId, courseId, data }: iAppProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: data.title,
      chapterId: chapterId,
      courseId: courseId,
      description: data.description ?? undefined,
      videoFileKey: data.videoKey ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<LessonSchemaType> = (values) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(values, data.id),
      );
      if (error) {
        toast.error("Error Updating lesson:");
        return;
      }

      if (result.status == "success") {
        toast.success(result.message);
      } else if (result.status == "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <Link
        href={`/instructor/courses/${courseId}/edit`}
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
      >
        <ArrowLeft size={6} />
        Back to Chapter
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            Configure the Lesson
          </CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Thumbnail </FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoFileKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Video </FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={pending}
                className={buttonVariants()}
              >
                {pending ? "Saving..." : "Save Lesson"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
