"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { enrollInCourseAction } from "../actions";

export function EnrollButton({ courseId }: { courseId: string }) {
  const [pending, setPending] = useState(false);

  const handleEnroll = async () => {
    try {
      setPending(true);
      const res = await enrollInCourseAction(courseId);

      if (res.status === "success" && res.message) {
        // Redirect user to Paystack
        window.location.href = res.message;
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to initialize checkout");
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      className="w-full justify-center"
      size="lg"
      onClick={handleEnroll}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Enroll Now!"
      )}
    </Button>
  );
}
