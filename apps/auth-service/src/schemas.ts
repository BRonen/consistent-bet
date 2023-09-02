import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
});

export type UserType = InferModel<typeof userSchema>;

/*

import { InferModel } from 'drizzle-orm';
import {
    integer,
    pgTable,
    serial,
    varchar,
} from 'drizzle-orm/pg-core';

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

*/
