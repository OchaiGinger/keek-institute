"use client";

import { RevenueData } from "@/app/data/admin/get-revenue";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCurrencyNaira,
  IconUsers,
  IconReceipt,
  IconChartBar,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const COLORS = [
  "hsl(var(--primary))",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
];

export function RevenueClient({ data }: { data: RevenueData }) {
  const {
    totalRevenue,
    totalEnrollments,
    avgOrderValue,
    thisMonthRevenue,
    growth,
    monthlyRevenue,
    revenueByCategory,
    topCourses,
    recentTransactions,
  } = data;

  const stats = [
    {
      label: "Total Revenue",
      value: fmt(totalRevenue),
      icon: IconCurrencyNaira,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "This Month",
      value: fmt(thisMonthRevenue),
      icon: IconChartBar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      badge: growth,
    },
    {
      label: "Total Enrollments",
      value: totalEnrollments.toLocaleString(),
      icon: IconUsers,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Avg. Order Value",
      value: fmt(avgOrderValue),
      icon: IconReceipt,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Revenue</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track earnings and enrollment performance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="text-xl font-bold tracking-tight">{s.value}</p>
                  {s.badge !== undefined && (
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        s.badge >= 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {s.badge >= 0 ? (
                        <IconTrendingUp className="size-3" />
                      ) : (
                        <IconTrendingDown className="size-3" />
                      )}
                      {Math.abs(s.badge)}% vs last month
                    </div>
                  )}
                </div>
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${s.bg}`}
                >
                  <s.icon className={`size-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart — Monthly Revenue */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Monthly Revenue
            </CardTitle>
            <p className="text-xs text-muted-foreground">Last 12 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={monthlyRevenue}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [fmt(v), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart — Revenue by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              By Category
            </CardTitle>
            <p className="text-xs text-muted-foreground">Revenue breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={revenueByCategory}
                layout="vertical"
                margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [fmt(v), "Revenue"]}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {revenueByCategory.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top Courses */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Top Courses
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              By revenue generated
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCourses.map((course, i) => {
              const max = topCourses[0].revenue;
              const pct = Math.round((course.revenue / max) * 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium line-clamp-1 flex-1 mr-2">
                      {course.title}
                    </p>
                    <span className="text-xs font-semibold text-muted-foreground shrink-0">
                      {fmt(course.revenue)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: COLORS[i % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Recent Transactions
            </CardTitle>
            <p className="text-xs text-muted-foreground">Latest enrollments</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  {/* Avatar */}
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {tx.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {tx.course}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-emerald-600">
                      {fmt(tx.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {recentTransactions.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No transactions yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
