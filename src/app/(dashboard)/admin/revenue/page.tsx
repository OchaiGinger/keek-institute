import { Suspense } from "react";
import { getAdminRevenue } from "@/app/data/admin/get-revenue";
import { RevenueClient } from "./_components/revenue-client";
import { RevenuePageSkeleton } from "./_components/revenue-skeleton";

export default async function RevenuePage() {
  return (
    <Suspense fallback={<RevenuePageSkeleton />}>
      <RevenueContent />
    </Suspense>
  );
}

async function RevenueContent() {
  const data = await getAdminRevenue();
  return <RevenueClient data={data} />;
}
