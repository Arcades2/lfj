'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/_components/ui/select';
import { useParams, useRouter } from 'next/navigation';

export type JobSwitcherProps = {
  jobs: Array<{
    id: number;
    title: string;
  }>;
};

export function JobSwitcher({ jobs }: JobSwitcherProps) {
  const router = useRouter();
  const params = useParams<{ jobId?: string }>();

  return (
    <div>
      <Select
        defaultValue={params.jobId}
        onValueChange={(jobId) => {
          router.push(`/job/${jobId}/offers`);
        }}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a job" />
        </SelectTrigger>
        <SelectContent>
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.id.toString()}>
              {job.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
