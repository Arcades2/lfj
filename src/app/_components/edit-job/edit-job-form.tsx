"use client";

import React from "react";
import { insertJobSchema } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { editJob } from "@/app/actions";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/server/db/schema";

export type EditJobFormProps = {
  job: InferSelectModel<typeof job>;
  afterUpdate?: () => void;
};

export function EditJobForm({ job, afterUpdate }: EditJobFormProps) {
  const router = useRouter();
  const form = useForm<z.input<typeof insertJobSchema>>({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      title: job.title,
      location: job.location ?? "",
      salary: job.salary ?? "",
      salaryfrequency: job.salaryfrequency,
      description: job.description ?? "",
    },
  });

  const onSubmit = (values: z.input<typeof insertJobSchema>) => {
    editJob(job.id, values);
    router.refresh();
    afterUpdate?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
                    {["hourly", "weekly", "bi-weekly", "monthly", "yearly"].map(
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
          Edit job
        </Button>
      </form>
    </Form>
  );
}
