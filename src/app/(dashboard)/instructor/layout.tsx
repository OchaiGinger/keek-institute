import {
  DashboardLayout,
  SidebarData,
} from "@/components/dashboard/shared-layout";

const instructorData: SidebarData = {
  navMain: [
    { title: "My Classes", url: "/instructor", icon: "Presentation" },
    { title: "Course Editor", url: "/instructor/courses", icon: "BookOpen" },
    { title: "Students", url: "/instructor/students", icon: "GraduationCap" },
  ],
  navSecondary: [
    { title: "Help Center", url: "/instructor/help", icon: "LifeBuoy" },
  ],
};

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={["INSTRUCTOR"]} navData={instructorData}>
      {children}
    </DashboardLayout>
  );
}
