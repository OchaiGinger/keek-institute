"use client";

import { IconCheck, IconPlayerPlay } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoKey: string | null;
  position: number;
};

type Props = {
  videoUrl: string | null;
  lesson: Lesson | null;
  isCompleted: boolean;
  onComplete: () => void;
};

export function VideoPlayer({
  videoUrl,
  lesson,
  isCompleted,
  onComplete,
}: Props) {
  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <IconPlayerPlay className="size-8 text-primary" />
        </div>
        <p className="text-lg font-semibold">Select a lesson to start</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Choose any lesson from the sidebar to begin learning.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      {/* Video */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-xl">
        {videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            controls
            className="h-full w-full"
            onEnded={onComplete}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-white/50">
            <IconPlayerPlay className="size-12" />
            <p className="text-sm">No video available for this lesson</p>
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Lesson {lesson.position}
            </p>
            <h1 className="text-2xl font-bold tracking-tight">
              {lesson.title}
            </h1>
          </div>

          <Button
            onClick={onComplete}
            disabled={isCompleted}
            variant={isCompleted ? "secondary" : "default"}
            className="shrink-0 gap-2"
          >
            {isCompleted ? (
              <>
                <IconCheck className="size-4 text-green-500" />
                Completed
              </>
            ) : (
              <>
                <IconCheck className="size-4" />
                Mark Complete
              </>
            )}
          </Button>
        </div>

        {lesson.description && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold mb-2">About this lesson</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lesson.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
