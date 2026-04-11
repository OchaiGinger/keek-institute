"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, BarChart2, Layers, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";
import type { RecentCourse } from "@/app/data/course/get-recent-courses";

gsap.registerPlugin(ScrollTrigger);

const LEVEL_COLORS: Record<string, { text: string; bg: string }> = {
  BEGINNER: { text: "#4ecca3", bg: "rgba(78,204,163,0.10)" },
  INTERMEDIATE: { text: "#c9a96e", bg: "rgba(201,169,110,0.10)" },
  ADVANCED: { text: "#ff6b6b", bg: "rgba(255,107,107,0.10)" },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

interface CoursesProps {
  courses: RecentCourse[];
}

export const Courses = ({ courses }: CoursesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".course-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="courses"
      className="py-20 md:py-32 bg-[#060a08] relative overflow-hidden"
    >
      {/* Background glows — same as Pricing */}
      <div className="absolute top-1/2 left-0 w-[80vw] h-[80vw] bg-[#2d5f4f]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#c9a96e]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-300 mx-auto px-[5%] relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#c9a96e] text-[0.7rem] md:text-[0.8rem] font-bold tracking-[0.3em] uppercase mb-4">
            LATEST COURSES
          </p>
          <h2 className="font-headline text-[#f5f0e8] text-[2.5rem] md:text-[5rem] leading-tight mb-8">
            Start Learning <span className="text-[#c9a96e] italic">Today</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-body px-4">
            Hands-on, industry-aligned programs built to get you job-ready —
            backed by certificates employers trust.
          </p>
        </div>

        {/* Course Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
        >
          {courses.map((course, i) => {
            const levelStyle =
              LEVEL_COLORS[course.level] ?? LEVEL_COLORS.BEGINNER;

            return (
              <div
                key={course.id}
                className="course-card group relative flex flex-col rounded-[24px] md:rounded-[2.5rem] border border-white/10 bg-white/3 backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME}.t3.tigrisfiles.io/${course.fileKey}`}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-30 group-hover:grayscale-0"
                  />
                  {/* Gradient fade into card body */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#060a08] via-[#060a08]/30 to-transparent" />

                  {/* Level badge — floating on image */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-[0.18em] uppercase"
                    style={{
                      color: levelStyle.text,
                      background: levelStyle.bg,
                      border: `1px solid ${levelStyle.text}33`,
                    }}
                  >
                    {course.level}
                  </div>

                  {/* Price badge — floating on image */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-[#c9a96e] text-[0.65rem] font-bold tracking-[0.12em]">
                    {formatPrice(course.price)}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-7 md:p-9">
                  {/* Category */}
                  <p className="text-white/30 text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-3">
                    {course.category}
                  </p>

                  {/* Title */}
                  <h3 className="font-headline text-[#f5f0e8] text-xl md:text-2xl font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-white transition-colors">
                    {course.title}
                  </h3>

                  {/* Small description */}
                  <p className="text-white/40 text-sm font-body leading-relaxed line-clamp-2 mb-6 flex-1">
                    {course.smallDescription}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-5 mb-8 text-white/35 text-[0.75rem] font-body">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{course.duration}h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span>{course._count.chapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{course._count.enrollments} enrolled</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/8 mb-7" />

                  {/* CTA */}
                  <Button
                    asChild
                    className="w-full py-6 rounded-xl md:rounded-2xl font-bold tracking-[0.18em] text-[0.7rem] uppercase bg-white/10 hover:bg-[#c9a96e] hover:text-[#060a08] text-white transition-all duration-300 group/btn"
                  >
                    <Link href={`/courses/${course.slug}`}>
                      <span>View Course</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 md:mt-20">
          <Button
            asChild
            variant="outline"
            className="border-white/15 text-white/60 hover:border-[#c9a96e]/50 hover:text-[#c9a96e] hover:bg-[#c9a96e]/5 rounded-2xl py-6 px-10 font-bold tracking-[0.2em] text-[0.7rem] uppercase transition-all duration-300"
          >
            <Link href="/courses">
              Browse All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
