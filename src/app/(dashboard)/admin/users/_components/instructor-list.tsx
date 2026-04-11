"use client";

import * as React from "react";
import { Briefcase, ChevronDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { InviteInstructorModal } from "./instructor-modal";

interface Instructor {
  id: string;
  name: string;
  email: string;
  userId?: string | null;
  createdAt: string; // always a string — ISO from server or toISOString() from action
}

export function InstructorList({ initialData }: { initialData: Instructor[] }) {
  const [data, setData] = React.useState<Instructor[]>(initialData);

  function handleInvited(instructor: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }) {
    setData((prev) => [
      {
        id: instructor.id,
        name: instructor.name,
        email: instructor.email,
        userId: null,
        createdAt: instructor.createdAt,
      },
      ...prev,
    ]);
  }

  return (
    <Collapsible defaultOpen className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-all group border-b">
        <CollapsibleTrigger className="flex flex-1 items-center gap-4 text-left">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Briefcase className="size-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold leading-none">
              Instructor Records
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage faculty and invitations
            </p>
          </div>
          <ChevronDown className="size-5 ml-auto transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>

        <div className="ml-4">
          <InviteInstructorModal onInvited={handleInvited} />
        </div>
      </div>

      <CollapsibleContent>
        <div className="p-6 pt-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground text-sm py-8"
                  >
                    No instructors yet. Invite one to get started.
                  </TableCell>
                </TableRow>
              )}
              {data.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell className="font-medium">{inst.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inst.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={inst.userId ? "default" : "secondary"}>
                      {inst.userId ? "Active" : "Invited"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(inst.createdAt).toLocaleDateString()}
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
