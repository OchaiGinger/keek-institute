"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./action";
import Link from "next/link";
const DeletePage = () => {
  const [pending, startTransition] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));
      if (error) {
        toast.error("Error deleting course:");
        return;
      }

      if (result.status == "success") {
        toast.success(result.message);

        router.push("/instructor/courses");
      } else if (result.status == "error") {
        toast.error(result.message);
      }
    });
  };
  return (
    <div className="max-w-xl mx-auto w-full mt-32">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. All course data will be permanently
            deleted. Please confirm that you want to proceed with deleting this
            course.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            href="/instructor/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button variant="destructive" onClick={onSubmit} disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Course"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeletePage;
