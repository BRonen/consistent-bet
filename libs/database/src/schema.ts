import { InferModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersSchema = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  balance: integer('balance').notNull().default(10),
});

export const transactionsSchema = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  status: text('status').notNull().default('processing'),
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
