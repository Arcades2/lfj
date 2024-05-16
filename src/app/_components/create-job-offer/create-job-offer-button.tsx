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
import { CreateJobOfferForm } from './create-job-offer-form';

export type CreateJobOfferButtonProps = {
  jobId: number;
};

export function CreateJobOfferButton({ jobId }: CreateJobOfferButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex gap-2 items-center">
          <IoIosAdd className="text-2xl" />
          <span>Add a job offer</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a job offer</DialogTitle>
        </DialogHeader>
        <CreateJobOfferForm
          afterCreate={() => setIsOpen(false)}
          jobId={jobId}
        />
      </DialogContent>
    </Dialog>
  );
}
