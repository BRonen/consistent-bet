import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const paymentSchema = pgTable('payments', {
  id: serial('id').primaryKey(),
  status: varchar('status').notNull().default('processing'),
  amount: integer('amount').notNull(),
  receiverId: integer('receiver_id').notNull(),
  senderId: integer('sender_id').notNull(),
});

export const ledgerSchema = pgTable('ledgers', {
  id: serial('id').primaryKey(),
  balance: integer('balance').notNull().default(0),
});

export type PaymentType = InferModel<typeof paymentSchema>;
