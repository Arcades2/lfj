import { db } from '@/server/db';
import { OfferCard } from '@/app/_components/offer-card';

export type JobOffersListProps = {
  jobId: number;
};

export async function JobOffersList({ jobId }: JobOffersListProps) {
  const offers = await db.query.offer.findMany({
    where: (o, { eq }) => eq(o.jobId, jobId),
    orderBy: (o, { desc }) => desc(o.createdAt),
  });

  return (
    <ul className="flex flex-wrap justify-start gap-8 w-full">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </ul>
  );
}
