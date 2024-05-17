// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  numeric,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lfj_${name}`);

export const job = createTable(
  'job',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    location: varchar('location', { length: 256 }),
    salary: numeric('salary', {
      precision: 100,
      scale: 2,
    }),
    salaryfrequency: varchar('salary_frequency', {
      length: 256,
      enum: ['hourly', 'weekly', 'bi-weekly', 'monthly', 'yearly'],
    })
      .default('yearly')
      .notNull(),
    description: varchar('description', { length: 512 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }),
  },
  (table) => ({
    title: index('title_idx').on(table.title),
  }),
);

export const insertJobSchema = z.object({
  title: z.string().min(1),
  location: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  salary: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (!val) {
        return;
      }

      if (Number.isNaN(parseFloat(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary must be a number',
        });
      }

      if (parseFloat(val) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary must be a positive number',
        });
      }
    })
    .transform((val) => (val === '' ? undefined : val)),
  salaryfrequency: z
    .enum(['hourly', 'weekly', 'bi-weekly', 'monthly', 'yearly'])
    .default('yearly'),
  description: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
});

export const offer = createTable(
  'offer',
  {
    id: serial('id').primaryKey(),
    company: varchar('company', { length: 256 }).notNull(),
    phone: varchar('phone', { length: 256 }),
    foundOn: varchar('found_on', { length: 256 }),
    location: varchar('location', { length: 256 }),
    salary: numeric('salary', {
      precision: 100,
      scale: 2,
    }),
    salaryFrequency: varchar('salary_frequency', {
      length: 256,
      enum: ['hourly', 'weekly', 'bi-weekly', 'monthly', 'yearly'],
    }),
    firstContactDate: timestamp('first_contact_date', { withTimezone: true }),
    notes: varchar('notes', { length: 512 }),
    declined: boolean('declined').default(false),
    jobId: integer('job_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: true }),
  },
  (table) => ({
    companyIndex: index('company_idx').on(table.company),
  }),
);

export const insertJobOfferSchema = z.object({
  company: z.string().min(1),
  phone: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  foundOn: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  location: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  salary: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (!val) {
        return;
      }

      if (Number.isNaN(parseFloat(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary must be a number',
        });
      }

      if (parseFloat(val) < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary must be a positive number',
        });
      }
    })
    .transform((val) => (val === '' ? undefined : val)),
  salaryFrequency: z
    .enum(['hourly', 'weekly', 'bi-weekly', 'monthly', 'yearly'])
    .default('yearly'),
  firstContactDate: z.date().optional(),
  notes: z
    .string()
    .min(1)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  declined: z.boolean().default(false),
  jobId: z.number().int(),
});

export const jobRelations = relations(job, ({ many }) => ({
  offers: many(offer),
}));

export const followUp = createTable('follow_up', {
  id: serial('id').primaryKey(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  eventType: varchar('event_type', {
    length: 256,
    enum: ['phone', 'email', 'in-person', 'other'],
  }).notNull(),
  details: varchar('details', { length: 512 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }),
  offerId: integer('offer_id')
    .references(() => offer.id, { onDelete: 'cascade' })
    .notNull(),
});

export const insertFollowUpSchema = z.object({
  date: z.date(),
  eventType: z.enum(['phone', 'email', 'in-person', 'other']),
  details: z.string().min(1),
  offerId: z.number().int(),
});

export const followUpRelations = relations(followUp, ({ one }) => ({
  offer: one(offer, {
    fields: [followUp.offerId],
    references: [offer.id],
  }),
}));

export const offerRelations = relations(offer, ({ one, many }) => ({
  job: one(job, {
    fields: [offer.jobId],
    references: [job.id],
  }),
  followUps: many(followUp),
}));
