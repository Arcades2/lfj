import { db } from '@/server/db';
import { EditOfferButton } from '@/app/_components/edit-offer';
import { FollowUpTable } from '@/app/_components/follow-up-table';
import { CreateFollowUpButton } from '@/app/_components/create-follow-up/create-follow-up-button';
import { CiPhone, CiSearch, CiStickyNote } from 'react-icons/ci';

export default async function FollowUpsPage({
  params,
}: {
  params: { offerId: string };
}) {
  const followUps = await db.query.followUp.findMany({
    where: (f, { eq }) => eq(f.offerId, Number(params.offerId)),
    orderBy: (f, { desc }) => desc(f.createdAt),
  });

  const offer = await db.query.offer.findFirst({
    where: (j, { eq }) => eq(j.id, Number(params.offerId)),
  });

  if (!offer) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <h1 className="text-5xl">404 - Job not found</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-[90vh] py-8">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">
          {offer.company}
          {offer.location ? ` | ${offer.location}` : ''}
          {offer.salary ? ` | ${offer.salary}/${offer.salaryFrequency}` : ''}
        </h1>
        <EditOfferButton offer={offer} />
      </div>
      {offer.phone && (
        <p className="flex gap-2 items-center">
          <CiPhone /> {offer.phone}
        </p>
      )}
      {offer.foundOn && (
        <p className="flex gap-2 items-center">
          <CiSearch /> {offer.foundOn}
        </p>
      )}
      {offer.notes && (
        <p className="flex gap-2 items-center">
          <CiStickyNote /> {offer.notes}
        </p>
      )}
      <div className="h-0.5 bg-secondary w-full my-8" />
      <div className="flex flex-col items-center gap-8">
        <CreateFollowUpButton offerId={offer.id} />
        <FollowUpTable followUps={followUps} />
      </div>
    </main>
  );
}
