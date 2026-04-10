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
import { HeroSection } from "@/components/sections/HeroSection";

export default async function Home() {
  // make the function async
  const courses = await getRecentCourses(); // fetch courses

  return (
    <>
      <div className="mt-5">
        <HeroSection />
      </div>
      <About />
      <Courses courses={courses} /> {/* pass fetched courses */}
      <Testimonials />
    </>
  );
}
