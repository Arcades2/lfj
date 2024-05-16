import { db } from '@/server/db';
import { CreateJobOfferButton } from '@/app/_components/create-job-offer';
import { JobOffersList } from '@/app/_components/job-offers-list';
import { EditOfferButton } from '@/app/_components/edit-offer';

export default async function FollowUpsPage({
  params,
}: {
  params: { offerId: string; jobId: string };
}) {
  const followUps = await db.query.followUp.findMany({
    where: (f, { eq }) => eq(f.offerId, Number(params.offerId)),
    orderBy: (f, { desc }) => desc(f.createdAt),
  });

  const offer = await db.query.offer.findFirst({
    where: (j, { eq }) => eq(j.id, Number(params.jobId)),
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
      {offer.notes && <p className="italic">{offer.notes}</p>}
      <div className="h-0.5 bg-secondary w-full my-8" />
      <div className="flex flex-col items-center gap-8" />
    </main>
  );
}
