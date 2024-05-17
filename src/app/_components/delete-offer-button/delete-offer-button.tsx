'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import { Button } from '@/app/_components/ui/button';
import { cn } from '@/lib/utils';
import { IoIosClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { deleteOffer } from '@/server/actions';
import React from 'react';

export type DeleteOfferButtonProps = {
  offerId: number;
  className?: string;
};

export function DeleteOfferButton({
  offerId,
  className,
}: DeleteOfferButtonProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn('text-lg', className)} asChild>
        <Button variant="destructive">
          <IoIosClose />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        Are you sure you want to delete this offer?
        <Button
          variant="destructive"
          onClick={async () => {
            await deleteOffer(offerId);
            router.refresh();
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
