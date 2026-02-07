"use client";

import { Briefcase, ChevronDown, Mail } from "lucide-react";
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

export function InstructorList({ initialData }: { initialData: any[] }) {
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
          <InviteInstructorModal />
        </div>
      </div>

      <CollapsibleContent>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell className="font-medium">{inst.name}</TableCell>
                  <TableCell>{inst.email}</TableCell>
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
