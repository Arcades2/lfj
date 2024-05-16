'use client';

import { insertJobSchema } from '@/server/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { useRouter } from 'next/navigation';
import { createJob } from '@/server/actions';

export type CreateJobFormProps = {
  afterCreate?: () => void;
};

export function CreateJobForm({ afterCreate }: CreateJobFormProps) {
  const router = useRouter();
  const form = useForm<z.input<typeof insertJobSchema>>({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      title: '',
      location: '',
      salary: '',
      salaryfrequency: 'yearly',
      description: '',
    },
  });

  const onSubmit = async (values: z.input<typeof insertJobSchema>) => {
    await createJob(values);
    router.refresh();
    afterCreate?.();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title<span className="text-destructive"> *</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryfrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a salary frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['hourly', 'weekly', 'bi-weekly', 'monthly', 'yearly'].map(
                      (freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 ">
          Create job
        </Button>
      </form>
    </Form>
  );
}
