import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function RevenuePageSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-3 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-xl bg-muted" />
        <div className="h-80 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
