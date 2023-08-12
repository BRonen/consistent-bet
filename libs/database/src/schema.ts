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
  password: text('status').notNull().default('processing'),
  amount: integer('amount').notNull(),
  userId: integer('user_id').notNull()
  .references(() => usersSchema.id),
});


export const transactionsRelations = relations(transactionsSchema, ({ one, many }) => ({
	user: one(usersSchema, {
		fields: [transactionsSchema.userId],
		references: [usersSchema.id],
	}),
	transactions: many(transactionsSchema)
}));
 

export type UserType = InferModel<typeof usersSchema>;
