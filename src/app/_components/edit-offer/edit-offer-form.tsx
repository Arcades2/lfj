'use client';

import React from 'react';
import { insertJobOfferSchema, type offer } from '@/server/db/schema';
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
import { type InferSelectModel } from 'drizzle-orm';
import { editOffer } from '@/server/actions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { Textarea } from '../ui/textarea';

export type EditOfferFormProps = {
  offer: InferSelectModel<typeof offer>;
  afterUpdate?: () => void;
};

export function EditOfferForm({ offer, afterUpdate }: EditOfferFormProps) {
  const router = useRouter();
  const form = useForm<z.input<typeof insertJobOfferSchema>>({
    resolver: zodResolver(insertJobOfferSchema),
    defaultValues: {
      company: offer.company,
      foundOn: offer.foundOn ?? '',
      jobId: offer.jobId,
      phone: offer.phone ?? '',
      location: offer.location ?? '',
      salary: offer.salary ?? '',
      salaryFrequency: offer.salaryFrequency ?? 'yearly',
      firstContactDate: offer.firstContactDate ?? undefined,
      notes: offer.notes ?? '',
      declined: offer.declined ?? false,
    },
  });

  const onSubmit = async (values: z.input<typeof insertJobOfferSchema>) => {
    await editOffer(offer.id, values);
    router.refresh();
    afterUpdate?.();
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
            name="salaryFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
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
