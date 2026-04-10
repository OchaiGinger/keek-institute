// app/(public)/courses/_components/courses-error-boundary.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Just re-export from react-error-boundary — no class needed
export { ErrorBoundary as CoursesErrorBoundary } from "react-error-boundary";

export function CoursesFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <p className="text-muted-foreground">
        Failed to load courses. Please try again.
      </p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </div>
  );
}
