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
import { type offer } from '@/server/db/schema';
import { EditOfferForm } from './edit-offer-form';

export type EditOfferButtonProps = {
  offer: InferSelectModel<typeof offer>;
};

export function EditOfferButton({ offer }: EditOfferButtonProps) {
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
          <DialogTitle>Edit your job offer</DialogTitle>
        </DialogHeader>
        <EditOfferForm offer={offer} afterUpdate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
