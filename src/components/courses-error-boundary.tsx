"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";

function CoursesFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <p className="text-muted-foreground">Failed to load courses.</p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </div>
  );
}

export function CoursesErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={CoursesFallback}>
      {children}
    </ErrorBoundary>
  );
}
