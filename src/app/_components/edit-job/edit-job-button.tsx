"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { CiEdit } from "react-icons/ci";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/server/db/schema";
import { EditJobForm } from "./edit-job-form";

export type EditJobButtonProps = {
  job: InferSelectModel<typeof job>;
};

export function EditJobButton({ job }: EditJobButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-2xl">
          <CiEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your job project</DialogTitle>
        </DialogHeader>
        <EditJobForm job={job} afterUpdate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
