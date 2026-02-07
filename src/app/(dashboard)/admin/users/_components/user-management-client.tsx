import prisma from "@/lib/prisma";
import { StudentList } from "./student-list";
import { InstructorList } from "./instructor-list";

export default async function UserManagementPage() {
  const [students, instructors] = await Promise.all([
    prisma.student.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.instructor.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Approve students and manage institute instructors.
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
