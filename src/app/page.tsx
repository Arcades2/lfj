import { db } from '@/server/db';
import { count } from 'drizzle-orm';
import { job } from '@/server/db/schema';
import { CreateJobButton } from '@/app/_components/create-job';

export default async function HomePage() {
  const jobQuery = await db
    .select({
      count: count(),
    })
    .from(job);

  return (
    <main className="container mx-auto flex min-h-[90vh] flex-col justify-center gap-4 py-8">
      <h1 className="text-center text-5xl">
        {jobQuery[0]?.count ? 'Select a job first or' : 'Create a job first'}
      </h1>
      <div className="mx-auto mt-4">
        <CreateJobButton />
      </div>
    </main>
  );
}
