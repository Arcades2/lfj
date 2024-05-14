'use client';

import { insertJobOfferSchema } from '@/server/db/schema';
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
import { Calendar } from '@/app/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Textarea } from '@/app/_components/ui/textarea';
import { createJobOffer } from '@/server/actions';

export type CreateJobOfferFormProps = {
  jobId: number;
  afterCreate?: () => void;
};

export function CreateJobOfferForm({
  afterCreate,
  jobId,
}: CreateJobOfferFormProps) {
  const router = useRouter();
  const form = useForm<z.input<typeof insertJobOfferSchema>>({
    resolver: zodResolver(insertJobOfferSchema),
    defaultValues: {
      company: '',
      foundOn: '',
      jobId,
      phone: '',
      location: '',
      salary: '',
      salaryfrequency: 'yearly',
      firstContactDate: new Date(),
      notes: '',
      declined: false,
    },
  });

  const onSubmit = async (values: z.input<typeof insertJobOfferSchema>) => {
    await createJobOffer(values);
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
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company<span className="text-destructive"> *</span>
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
          name="firstContactDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>First contact date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
        <FormField
          control={form.control}
          name="foundOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Found on</FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-zone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 ">
          Create job offer
        </Button>
      </form>
    </Form>
  );
}
