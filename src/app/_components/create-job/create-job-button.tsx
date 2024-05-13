import React from 'react';
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { CreateJobForm } from './create-job-form';

export function CreateJobButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mx-auto mt-4" size="lg">
          Create a job project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your job project</DialogTitle>
        </DialogHeader>
        <CreateJobForm afterCreate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
