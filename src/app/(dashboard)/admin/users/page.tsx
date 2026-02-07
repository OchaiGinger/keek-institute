// app/admin/users/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { StudentList } from "./_components/student-list";
import { InstructorList } from "./_components/instructor-list";

export default async function UserManagementPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  const [rawStudents, rawInstructors] = await Promise.all([
    prisma.student.findMany({
      where: {
        user: {
          role: "USER", // This excludes ADMIN and INSTRUCTOR roles
        },
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.instructor.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Flattening data to avoid serialization/circularity issues
  const students = rawStudents.map((s) => ({
    id: s.id,
    firstName: s.firstName,
    lastName: s.lastName,
    registrationNumber: s.registrationNumber,
    category: s.category,
    trainingMode: s.trainingMode,
    status: s.status,
    email: s.user.email,
  }));

  const instructors = rawInstructors.map((i) => ({
    id: i.id,
    name: i.user?.name || "Pending Signup",
    email: i.email,
  }));

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Filter: Showing only base User signups for Student Approval.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <StudentList initialData={students} />
        <InstructorList initialData={instructors} />
      </div>
    </div>
  );
}
