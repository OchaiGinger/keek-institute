"use client";

import * as React from "react";
import { ChevronDown, UserCircle, BadgeCheck } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { approveStudentAction } from "./actions";

export function StudentList({ initialData }: { initialData: any[] }) {
  const [data, setData] = React.useState(initialData);

  async function onApprove(id: string) {
    const res = await approveStudentAction(id);
    if (res.success) {
      toast.success("Student approved successfully");
      setData((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "APPROVED", registrationNumber: res.regNo }
            : s,
        ),
      );
    } else {
      toast.error("Approval failed");
    }
  }

  return (
    <Collapsible defaultOpen className="rounded-xl border bg-card shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-muted/50 transition-all group text-left">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <UserCircle className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold leading-none">
              Student Records
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage registrations and approvals
            </p>
          </div>
        </div>
        <ChevronDown className="size-5 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="p-6 pt-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-37.5">Full Name</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Training</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                    <div className="text-xs text-muted-foreground font-normal">
                      {student.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {student.registrationNumber || "Unassigned"}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize text-xs">
                    {student.category.toLowerCase()}
                  </TableCell>
                  <TableCell className="capitalize text-xs">
                    {student.trainingMode.toLowerCase()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "APPROVED" ? "default" : "secondary"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {student.status === "PENDING" && (
                      <Button
                        size="sm"
                        onClick={() => onApprove(student.id)}
                        className="gap-2"
                      >
                        <BadgeCheck className="size-4" /> Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
