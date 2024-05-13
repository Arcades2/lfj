import { db } from "@/server/db";
import { JobSwitcher } from "./job-switcher";

export async function JobSwitcherContainer() {

  const jobs = await db.query.job.findMany({
    orderBy: (job, { desc }) => [desc(job.createdAt)]
  })

  return <JobSwitcher jobs={jobs} />
}
