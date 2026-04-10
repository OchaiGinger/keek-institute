import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="@container/card animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-7 w-16 rounded bg-muted" />
            </div>
            <div className="size-6 rounded bg-muted" />
          </CardHeader>
          <CardFooter>
            <div className="h-3 w-36 rounded bg-muted" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
