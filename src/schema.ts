import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersSchema = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});
