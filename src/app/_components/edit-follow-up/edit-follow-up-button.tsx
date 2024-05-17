'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import React from 'react';
import { Button } from '@/app/_components/ui/button';
import { CiEdit } from 'react-icons/ci';
import { type InferSelectModel } from 'drizzle-orm';
import { type followUp } from '@/server/db/schema';
import { EditFollowUpForm } from './edit-follow-up-form';

export type EditFollowUpButtonProps = {
  followUp: InferSelectModel<typeof followUp>;
};

export function EditFollowUpButton({ followUp }: EditFollowUpButtonProps) {
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
          <DialogTitle>Edit your follow up</DialogTitle>
        </DialogHeader>
        <EditFollowUpForm
          followUp={followUp}
          afterUpdate={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
