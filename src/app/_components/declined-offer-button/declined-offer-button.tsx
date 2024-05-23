'use client';

import { Button } from '@/app/_components/ui/button';
import { declineOffer } from '@/server/actions';
import { useParams, useRouter } from 'next/navigation';

export type DeclinedOfferButtonProps = {
  offerId: number;
};

export function DeclinedOfferButton({ offerId }: DeclinedOfferButtonProps) {
  const router = useRouter();
  const params = useParams<{ jobId: string }>();

  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await declineOffer(offerId);
        router.push(`/job/${params.jobId}/offers`);
        router.refresh();
      }}
    >
      Offer declined
    </Button>
  );
}
