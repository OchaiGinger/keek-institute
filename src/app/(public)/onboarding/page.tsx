// app/onboarding/page.tsx
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Onboarding from "./_components/onboarding";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // Find the student record associated with this user
  const studentDb = await prisma.student.findUnique({
    where: { userId: session.user.id },
  });

  // HYDRATION: If studentDb doesn't have names yet,
  // pull them from the BetterAuth User session
  const studentData = {
    ...studentDb,
    id: studentDb?.id || "TEMP",
    firstName:
      studentDb?.firstName || session.user.name?.split(" ")[0] || "Student",
    lastName: studentDb?.lastName || session.user.name?.split(" ")[1] || "",
    registrationNumber: studentDb?.registrationNumber || null,
  };

  return <Onboarding student={studentData as any} />;
}
