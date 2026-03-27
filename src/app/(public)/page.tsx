import About from "@/components/sections/About";
import { Courses } from "@/components/sections/Courses";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { getRecentCourses } from "@/app/data/course/get-recent-courses"; // add this import
import {
  BookIcon,
  Gamepad,
  GitGraph,
  LucideIcon,
  PersonStanding,
  User2,
} from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/sections/Testimonials";

export default async function Home() {
  // make the function async
  const courses = await getRecentCourses(); // fetch courses

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center tex-center space-y-8">
          <Badge variant="outline">The Future of Online Tech Education </Badge>
          <h1 className="text-4xl md:text-6xl font-bold  mt-8 tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-175 text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, Interactive learning
            management system. Access high-quality courses and resources from
            industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/courses"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore Courses
            </Link>
            <Link
              href="/auth/signup"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <About />
      <Courses courses={courses} /> {/* pass fetched courses */}
      <Testimonials />
    </>
  );
}
