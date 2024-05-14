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
import { CreateJobOfferForm } from './create-job-offer-form';

export type CreateJobOfferButtonProps = {
  jobId: number;
};

export function CreateJobOfferButton({ jobId }: CreateJobOfferButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mx-auto mt-4" size="lg">
          Add a job offer
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
