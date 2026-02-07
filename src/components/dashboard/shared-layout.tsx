// components/dashboard/shared-layout.tsx
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as icons from "lucide-react";

export type LucideIconName = keyof typeof icons;

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIconName;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

export interface SidebarData {
  navMain: NavItem[];
  navSecondary?: NavItem[];
}

interface LayoutProps {
  children: React.ReactNode;
  allowedRoles: ("INSTRUCTOR" | "ADMIN" | "USER")[];
  navData: SidebarData;
}

export const DashboardLayout = async ({
  children,
  allowedRoles,
  navData,
}: LayoutProps) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/auth/signin");
  if (!allowedRoles.includes(session.user.role as any)) return redirect("/");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" navData={navData} />
      <SidebarInset className="overflow-hidden flex flex-col h-screen">
        <SiteHeader />
        <main className="flex-1 overflow-y-auto ">
          <div className="p-4 md:p-6 lg:p-8 max-w-400 mx-auto space-y-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
