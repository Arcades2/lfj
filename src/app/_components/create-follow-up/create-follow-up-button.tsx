'use client';

import React from 'react';
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { IoIosAdd } from 'react-icons/io';
import { CreateFollowUpForm } from './create-follow-up-form';

export type CreateFollowUpButtonProps = {
  offerId: number;
};

export function CreateFollowUpButton({ offerId }: CreateFollowUpButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex gap-2 items-center">
          <IoIosAdd className="text-2xl" />
          <span>Add a follow up</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a follow up</DialogTitle>
        </DialogHeader>
        <CreateFollowUpForm
          offerId={offerId}
          afterCreate={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
