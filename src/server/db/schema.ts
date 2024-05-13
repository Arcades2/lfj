// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  numeric,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lfj_${name}`);

export const job = createTable(
  "job",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    location: varchar("location", { length: 256 }),
    salary: numeric("salary", {
      precision: 100, scale: 2
    }),
    salaryfrequency: varchar("salary_frequency", { length: 256, enum: ["hourly", "weekly", "bi-weekly", "monthly", "yearly"] }).default("yearly").notNull(),
    description: varchar("description", { length: 512 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    title: index("title_idx").on(table.title),
  })
);

export const insertJobSchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1).optional().or(z.literal("")).transform((val) => val === "" ? undefined : val),
  salary: z.string().optional().superRefine((val, ctx) => {
    if (!val) {
      return;
    }

    if (isNaN(parseFloat(val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Salary must be a number",
      });
    }

    if (parseFloat(val) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Salary must be a positive number",
      });
    }
  }).transform((val) => val === "" ? undefined : val),
  salaryfrequency: z.enum(["hourly", "weekly", "bi-weekly", "monthly", "yearly"]).default("yearly"),
  description: z.string().min(1).optional().or(z.literal("")).transform((val) => val === "" ? undefined : val),
})

export const jobRelations = relations(job, ({ many }) => ({
  offers: many(offer)
}))

export const offer = createTable(
  "offer",
  {
    id: serial("id").primaryKey(),
    company: varchar("company", { length: 256 }).notNull(),
    phone: varchar("phone", { length: 256 }),
    foundOn: varchar("found_on", { length: 256 }),
    location: varchar("location", { length: 256 }),
    salary: numeric("salary", {
      precision: 100, scale: 2
    }),
    salaryfrequency: varchar("salary_frequency", { length: 256, enum: ["hourly", "weekly", "bi-weekly", "monthly", "yearly"] }),
    firstContactDate: timestamp("first_contact_date", { withTimezone: true }),
    notes: varchar("notes", { length: 512 }),
    declined: boolean("declined").default(false),
    jobId: integer("job_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    companyIndex: index("company_idx").on(table.company),
  })
);

export const offerRelations = relations(offer, ({ one }) => ({
  job: one(job, {
    fields: [offer.jobId],
    references: [job.id],
  })
}))
