// components/dashboard/dashboard-shell.tsx
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

export const DashboardShell = ({
  data,
  title,
}: {
  data: any;
  title: string;
}) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <SectionCards />
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
};
