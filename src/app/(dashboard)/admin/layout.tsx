import {
  DashboardLayout,
  SidebarData,
} from "@/components/dashboard/shared-layout";

const adminData: SidebarData = {
  navMain: [
    { title: "Dashboard", url: "/admin", icon: "LayoutDashboard" },
    { title: "User Management", url: "/admin/users", icon: "Users" },
    { title: "Revenue", url: "/admin/billing", icon: "Banknote" },
  ],
  navSecondary: [
    { title: "Settings", url: "/admin/settings", icon: "Settings" },
  ],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout allowedRoles={["ADMIN"]} navData={adminData}>
      {children}
    </DashboardLayout>
  );
}
