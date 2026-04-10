import prisma from "@/lib/prisma";

export async function getAdminRevenue() {
  const enrollments = await prisma.enrollment.findMany({
    where: { status: "Active" },
    select: {
      amount: true,
      createdAt: true,
      Course: { select: { title: true, category: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = enrollments.reduce((sum, e) => sum + e.amount, 0);
  const totalEnrollments = enrollments.length;
  const avgOrderValue =
    totalEnrollments > 0 ? Math.round(totalRevenue / totalEnrollments) : 0;

  // Monthly revenue for the last 12 months
  const now = new Date();
  const monthlyMap = new Map<string, number>();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
    monthlyMap.set(key, 0);
  }

  enrollments.forEach((e) => {
    const d = new Date(e.createdAt);
    const key = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
    if (monthlyMap.has(key)) {
      monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + e.amount);
    }
  });

  const monthlyRevenue = Array.from(monthlyMap.entries()).map(
    ([month, revenue]) => ({ month, revenue }),
  );

  // Revenue by category
  const categoryMap = new Map<string, number>();
  enrollments.forEach((e) => {
    const cat = e.Course?.category ?? "Uncategorized";
    categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + e.amount);
  });
  const revenueByCategory = Array.from(categoryMap.entries())
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  // Top courses by revenue
  const courseMap = new Map<string, number>();
  enrollments.forEach((e) => {
    const title = e.Course?.title ?? "Unknown";
    courseMap.set(title, (courseMap.get(title) ?? 0) + e.amount);
  });
  const topCourses = Array.from(courseMap.entries())
    .map(([title, revenue]) => ({ title, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Recent transactions
  const recentTransactions = enrollments.slice(0, 8).map((e) => ({
    name: e.user?.name ?? "Unknown",
    email: e.user?.email ?? "",
    course: e.Course?.title ?? "Unknown",
    amount: e.amount,
    date: e.createdAt,
  }));

  // This month vs last month
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonthRevenue = enrollments
    .filter((e) => new Date(e.createdAt) >= thisMonth)
    .reduce((s, e) => s + e.amount, 0);
  const lastMonthRevenue = enrollments
    .filter(
      (e) =>
        new Date(e.createdAt) >= lastMonth && new Date(e.createdAt) < thisMonth,
    )
    .reduce((s, e) => s + e.amount, 0);
  const growth =
    lastMonthRevenue > 0
      ? Math.round(
          ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100,
        )
      : 100;

  return {
    totalRevenue,
    totalEnrollments,
    avgOrderValue,
    thisMonthRevenue,
    growth,
    monthlyRevenue,
    revenueByCategory,
    topCourses,
    recentTransactions,
  };
}

export type RevenueData = Awaited<ReturnType<typeof getAdminRevenue>>;
