import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
});

export type UserType = InferModel<typeof userSchema>;

export const outboxEventSchema = pgTable('outbox_events', {
  id: serial('id').primaryKey(),
  status: varchar('status', { length: 256 }).notNull().default('not_processed'),
  event_name: varchar('event_name', { length: 256 }).notNull(),
  user_id: integer('user_id'),
});
