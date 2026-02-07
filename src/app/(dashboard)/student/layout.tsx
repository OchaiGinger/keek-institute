import {
  DashboardLayout,
  SidebarData,
} from "@/components/dashboard/shared-layout";

const studentData: SidebarData = {
  navMain: [
    {
      title: "Learning Dashboard",
      url: "/student",
      icon: "LayoutDashboard",
    },
    {
      title: "My Courses",
      url: "/student/courses",
      icon: "LibraryBig",
    },
    {
      title: "Assignments",
      url: "/student/assignments",
      icon: "FileText",
    },
    {
      title: "Grades & Progress",
      url: "/student/grades",
      icon: "Trophy",
    },
    {
      title: "Schedule",
      url: "/student/schedule",
      icon: "CalendarDays",
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/student/support",
      icon: "LifeBuoy",
    },
    {
      title: "Settings",
      url: "/student/settings",
      icon: "Settings",
    },
  ],
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={["USER"]} navData={studentData}>
      {children}
    </DashboardLayout>
  );
}
