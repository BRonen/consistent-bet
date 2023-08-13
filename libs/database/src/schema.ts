import { InferModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';

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

export const betableSchema = pgTable('betable', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  price: integer('price') // TODO: split buy price and sell price into two columns
    .notNull(),
});

export const betablePurchaseSchema = pgTable('betable_purchase', {
  id: serial('id').primaryKey(),
  status: varchar('status').notNull().default('processing'),
  isSell: boolean('buy_or_sell').notNull(),
  buyerId: integer('buyer_id')
    .notNull()
    .references(() => usersSchema.id),
  betableId: integer('betable_id')
    .notNull()
    .references(() => betableSchema.id),
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

export const betablePurchaseRelations = relations(
  betablePurchaseSchema,
  ({ one, many }) => ({
    user: one(usersSchema, {
      fields: [betablePurchaseSchema.buyerId],
      references: [usersSchema.id],
    }),
    betable: one(betableSchema, {
      fields: [betablePurchaseSchema.betableId],
      references: [betableSchema.id],
    }),
    betablePurchase: many(betablePurchaseSchema),
  }),
);

export type UserType = InferModel<typeof usersSchema>;
export type TransactionType = InferModel<typeof transactionsSchema>;
export type BetableType = InferModel<typeof betableSchema>;
export type BetablePurchaseType = InferModel<typeof betablePurchaseSchema>;
