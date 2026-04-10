"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  IconArrowRight,
  IconBrandYoutube,
  IconChevronLeft,
  IconChevronRight,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    label: "Web Development",
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    label: "Backend Engineering",
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    label: "Full Stack Projects",
  },
  {
    url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    label: "Cloud & DevOps",
  },
];

const STATS = [
  { value: "12K+", label: "Students" },
  { value: "200+", label: "Courses" },
  { value: "98%", label: "Satisfaction" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="grid min-h-150 grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="relative z-10 flex flex-col justify-center px-8 py-16 md:px-14 lg:py-20">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              <IconBrandYoutube className="size-3.5 text-red-400" />
              <span>Live cohorts now open</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl">
            Master Tech
            <br />
            <span className="bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
              Skills That Pay.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/50 md:text-lg">
            Industry-led courses built for developers who want to ship faster,
            earn more, and stand out in any market.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar
                  key={i}
                  className="size-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm text-white/50">
              <span className="font-semibold text-white">4.9</span> from 3,200+
              reviews
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className={buttonVariants({ size: "lg" })}
              style={{
                background: "white",
                color: "black",
                fontWeight: 600,
                borderRadius: "9999px",
                paddingLeft: "1.75rem",
                paddingRight: "1.75rem",
              }}
            >
              Browse Courses
              <IconArrowRight className="ml-1 size-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Get Started Free
            </Link>
          </div>

          <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="mt-0.5 text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — IMAGE SLIDER */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-black to-transparent" />

          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.url}
                alt={slide.label}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}

          <div className="absolute bottom-16 left-8 z-10">
            <Badge className="border-white/20 bg-white/10 text-white backdrop-blur-sm">
              {SLIDES[current].label}
            </Badge>
          </div>

          <div className="absolute bottom-8 left-8 z-10 flex items-center gap-3">
            <button
              onClick={() => goTo(current - 1)}
              className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <IconChevronLeft className="size-4" />
            </button>

            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "1.5rem" : "0.375rem",
                    background:
                      i === current ? "white" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <IconChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
