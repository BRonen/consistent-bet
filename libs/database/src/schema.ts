import { InferModel, relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

// Real Entities

export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  balance: integer('balance').notNull().default(10),
});

export type UserType = InferModel<typeof userSchema>;

export const purchasableSchema = pgTable('purchasables', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  price: integer('price').notNull(),
});

export type PurchasableType = InferModel<typeof purchasableSchema>;

// Event Entities

//TODO: alter status column to a postgres enum

export const paymentSchema = pgTable('payments', {
  id: serial('id').primaryKey(),
  status: varchar('status').notNull().default('processing'),
  amount: integer('amount').notNull(),
  receiverId: integer('receiver_id')
    .notNull()
    .references(() => userSchema.id),
  senderId: integer('sender_id')
    .notNull()
    .references(() => userSchema.id),
});

export type PaymentType = InferModel<typeof paymentSchema>;

export const purchaseSchema = pgTable('purchases', {
  id: serial('id').primaryKey(),
  status: varchar('status').notNull().default('processing'),
  isSell: boolean('buy_or_sell').notNull(),
  buyerId: integer('buyer_id')
    .notNull()
    .references(() => userSchema.id),
  purchasableId: integer('betable_id')
    .notNull()
    .references(() => purchasableSchema.id),
});

export type PurchaseType = InferModel<typeof purchaseSchema>;

// Relationships

export const paymentsRelations = relations(paymentSchema, ({ one, many }) => ({
  user: one(userSchema, {
    fields: [paymentSchema.receiverId, paymentSchema.senderId],
    references: [userSchema.id, userSchema.id],
  }),
  transactions: many(paymentSchema),
}));

export const purchaseRelations = relations(purchaseSchema, ({ one, many }) => ({
  user: one(userSchema, {
    fields: [purchaseSchema.buyerId],
    references: [userSchema.id],
  }),
  purchasable: one(purchasableSchema, {
    fields: [purchaseSchema.purchasableId],
    references: [purchasableSchema.id],
  }),
  betablePurchase: many(purchaseSchema),
}));
