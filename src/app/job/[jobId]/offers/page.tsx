import { db } from '@/server/db';
import { EditJobButton } from '@/app/_components/edit-job';
import { CreateJobOfferButton } from '@/app/_components/create-job-offer';

export default async function JobPage({
  params,
}: {
  params: { jobId: string };
}) {
  const job = await db.query.job.findFirst({
    where: (j, { eq }) => eq(j.id, Number(params.jobId)),
  });

  if (!job) {
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
          {job.title}
          {job.location ? ` | ${job.location}` : ''}
          {job.salary ? ` | ${job.salary}/${job.salaryfrequency}` : ''}
        </h1>
        <EditJobButton job={job} />
      </div>
      {job.description && <p className="italic">{job.description}</p>}
      <CreateJobOfferButton jobId={job.id} />
    </main>
  );
}
