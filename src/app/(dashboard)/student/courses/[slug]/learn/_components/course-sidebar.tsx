"use client";

import { IconCheck, IconPlayerPlay, IconBook } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoKey: string | null;
  position: number;
};

type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Props = {
  course: { title: string; chapters: Chapter[]; totalLessons: number };
  activeLesson: Lesson | null;
  completedLessons: Set<string>;
  progress: number;
  onSelectLesson: (lesson: Lesson) => void;
};

export function CourseSidebar({
  course,
  activeLesson,
  completedLessons,
  progress,
  onSelectLesson,
}: Props) {
  const [openChapters, setOpenChapters] = useState<Set<string>>(
    new Set([course.chapters[0]?.id ?? ""]),
  );

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Sidebar Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <IconBook className="size-4 text-primary" />
          </div>
          <p className="text-sm font-semibold line-clamp-1">{course.title}</p>
        </div>
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {completedLessons.size} / {course.totalLessons} lessons
            </span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters + Lessons */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {course.chapters.map((chapter, chapterIndex) => (
            <Collapsible
              key={chapter.id}
              open={openChapters.has(chapter.id)}
              onOpenChange={() => toggleChapter(chapter.id)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/60 transition-colors text-left group">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {chapterIndex + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium line-clamp-1">
                    {chapter.title}
                  </span>
                  <IconChevronDown
                    className={cn(
                      "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                      openChapters.has(chapter.id) && "rotate-180",
                    )}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-3">
                  {chapter.lessons.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id;
                    const isDone = completedLessons.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                            isActive
                              ? "border-primary-foreground/30 bg-primary-foreground/20"
                              : isDone
                                ? "border-green-500 bg-green-500/10"
                                : "border-border bg-background",
                          )}
                        >
                          {isDone && !isActive ? (
                            <IconCheck className="size-3 text-green-500" />
                          ) : (
                            <IconPlayerPlay
                              className={cn(
                                "size-3",
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground",
                              )}
                            />
                          )}
                        </div>

                        <span className="flex-1 text-xs font-medium line-clamp-2 leading-snug">
                          {lesson.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
