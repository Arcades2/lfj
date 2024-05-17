'use server';

import { db } from '@/server/db';
import {
  followUp,
  insertFollowUpSchema,
  insertJobOfferSchema,
  insertJobSchema,
  job,
  offer,
} from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { type z } from 'zod';

// Job
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

// Offer
export async function createJobOffer(
  jobOfferInfo: z.input<typeof insertJobOfferSchema>,
) {
  const data = insertJobOfferSchema.parse(jobOfferInfo);

  await db.insert(offer).values(data);
}

export async function editOffer(
  offerId: number,
  offerInfo: z.input<typeof insertJobOfferSchema>,
) {
  const data = insertJobOfferSchema.parse(offerInfo);
  await db.update(offer).set(data).where(eq(offer.id, offerId));
}

export async function deleteOffer(offerId: number) {
  await db.delete(offer).where(eq(offer.id, offerId));
}

// Follow Up
export async function createFollowUp(
  followUpInfo: z.input<typeof insertFollowUpSchema>,
) {
  const data = insertFollowUpSchema.parse(followUpInfo);
  await db.insert(followUp).values(data);
}

export async function editFollowUp(
  followUpId: number,
  followUpInfo: z.input<typeof insertFollowUpSchema>,
) {
  const data = insertFollowUpSchema.parse(followUpInfo);
  await db.update(followUp).set(data).where(eq(followUp.id, followUpId));
}
