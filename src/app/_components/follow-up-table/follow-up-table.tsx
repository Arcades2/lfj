import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import { type InferSelectModel } from 'drizzle-orm';
import { type followUp } from '@/server/db/schema';
import { format } from 'date-fns';
import { FollowUpActionButton } from '@/app/_components/folluw-up-action-button';

export type FollowUpTableProps = {
  followUps: Array<InferSelectModel<typeof followUp>>;
};

export function FollowUpTable({ followUps }: FollowUpTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Event type</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followUps.map((followUp) => (
          <TableRow key={followUp.id}>
            <TableCell>{format(followUp.date, 'dd/MM/yyyy')}</TableCell>
            <TableCell>{followUp.eventType}</TableCell>
            <TableCell>{followUp.details}</TableCell>
            <TableCell>
              <FollowUpActionButton followUp={followUp} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
