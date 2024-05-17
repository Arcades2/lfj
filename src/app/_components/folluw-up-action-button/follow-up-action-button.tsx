import { type followUp } from '@/server/db/schema';
import { type InferSelectModel } from 'drizzle-orm';
import { EditFollowUpButton } from '@/app/_components/edit-follow-up';

export type FollowUpActionButtonProps = {
  followUp: InferSelectModel<typeof followUp>;
};

export function FollowUpActionButton({ followUp }: FollowUpActionButtonProps) {
  return <EditFollowUpButton followUp={followUp} />;
}
