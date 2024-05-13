"use server";
import { insertJobSchema, job } from "@/server/db/schema";
import { db } from "@/server/db";
import { z } from "zod";
import { eq } from "drizzle-orm";

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
