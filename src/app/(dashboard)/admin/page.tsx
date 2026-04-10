import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { SectionCardsSkeleton } from "@/components/sidebar/section-cards-skeleton";
import { SignedIn } from "@daveyplate/better-auth-ui";
export default async function UserDashboard() {
  // 1. Fetch real enrollments from Prisma (Last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const rawEnrollments = await prisma.enrollment.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // 2. Format the data for Recharts (Group by Date)
  const groupedData = rawEnrollments.reduce(
    (acc: Record<string, number>, curr) => {
      const date = curr.createdAt.toISOString().split("T")[0]; // "YYYY-MM-DD"
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {},
  );

  const formattedChartData = Object.keys(groupedData).map((date) => ({
    date,
    enrollment: groupedData[date],
  }));

  return (
    <div className="flex flex-col gap-6 p-6">
      <Suspense fallback={<SectionCardsSkeleton />}>
        <SectionCards />
      </Suspense>
      <SignedIn>
        <ChartAreaInteractive data={formattedChartData} />
      </SignedIn>
    </div>
  );
}
