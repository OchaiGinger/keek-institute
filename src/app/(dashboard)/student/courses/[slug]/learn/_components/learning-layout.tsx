"use client";

import { useState } from "react";
import { LearningCourse } from "@/app/data/student/get-learning-course";
import { VideoPlayer } from "./video-player";
import { CourseSidebar } from "./course-sidebar";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoKey: string | null;
  position: number;
};

export function LearningLayout({ data }: { data: LearningCourse }) {
  const { course, firstLesson, bucketUrl } = data;

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(firstLesson);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );

  const markComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  const videoUrl = activeLesson?.videoKey
    ? `${bucketUrl}/${activeLesson.videoKey}`
    : null;

  const progress =
    course.totalLessons > 0
      ? Math.round((completedLessons.size / course.totalLessons) * 100)
      : 0;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`shrink-0 border-r border-border bg-card transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        <CourseSidebar
          course={course}
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          progress={progress}
          onSelectLesson={setActiveLesson}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((o) => !o)}
            className="size-8 shrink-0"
          >
            {sidebarOpen ? (
              <IconLayoutSidebarLeftCollapse className="size-5" />
            ) : (
              <IconLayoutSidebarLeftExpand className="size-5" />
            )}
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {course.title}
            </p>
            <p className="text-sm font-medium truncate">
              {activeLesson?.title ?? "Select a lesson"}
            </p>
          </div>
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
        </div>

        {/* Video + Description */}
        <div className="flex-1 overflow-y-auto">
          <VideoPlayer
            videoUrl={videoUrl}
            lesson={activeLesson}
            isCompleted={
              activeLesson ? completedLessons.has(activeLesson.id) : false
            }
            onComplete={() => activeLesson && markComplete(activeLesson.id)}
          />
        </div>
      </div>
    </div>
  );
}
