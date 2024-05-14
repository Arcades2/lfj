'use server';

import {
  insertJobSchema,
  insertJobOfferSchema,
  job,
  offer,
} from '@/server/db/schema';
import { db } from '@/server/db';
import { type z } from 'zod';
import { eq } from 'drizzle-orm';

export async function createJob(jobInfo: z.input<typeof insertJobSchema>) {
  const data = insertJobSchema.parse(jobInfo);
  await db.insert(job).values(data);
}

export async function editJob(
  jobId: number,
  jobInfo: z.input<typeof insertJobSchema>,
) {
  const data = insertJobSchema.parse(jobInfo);
  await db.update(job).set(data).where(eq(job.id, jobId));
}

export async function createJobOffer(
  jobOfferInfo: z.input<typeof insertJobOfferSchema>,
) {
  const data = insertJobOfferSchema.parse(jobOfferInfo);

  await db.insert(offer).values(data);
}
