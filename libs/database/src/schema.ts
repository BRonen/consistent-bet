import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const usersSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  balance: integer('balance').notNull().default(10),
});

export const transactionsSchema = pgTable('transactions', {
  id: serial('id').primaryKey(),
  status: varchar('status', { length: 256 }).notNull().default('processing'),
  amount: integer('amount').notNull(),
  receiverId: integer('receiver_id')
    .notNull()
    .references(() => usersSchema.id),
  senderId: integer('sender_id')
    .notNull()
    .references(() => usersSchema.id),
});

export const transactionsRelations = relations(
  transactionsSchema,
  ({ one, many }) => ({
    user: one(usersSchema, {
      fields: [transactionsSchema.receiverId, transactionsSchema.senderId],
      references: [usersSchema.id, usersSchema.id],
    }),
    transactions: many(transactionsSchema),
  }),
);

export type UserType = InferModel<typeof usersSchema>;
export type TransactionType = InferModel<typeof transactionsSchema>;
