import { Inject } from '@nestjs/common';
import { InferModel, SQL, eq, sql } from 'drizzle-orm';
import { UserType, usersSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class UserRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  getUserHashByEmail(email) {
    const [user] = this.database
      .select({
        id: usersSchema.id,
        name: usersSchema.name,
        hash: usersSchema.password,
      })
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .all();

    return user;
  }

  create(createUserDto: InferModel<typeof usersSchema, 'insert'>) {
    const query = this.database
      .insert(usersSchema)
      .values(createUserDto)
      .returning();

    const [user] = query.values();

    return user;
  }

  findAll() {
    const users = this.database
      .select({
        id: usersSchema.id,
        name: usersSchema.name,
        email: usersSchema.email,
        balance: usersSchema.balance,
      })
      .from(usersSchema)
      .all();

    return users;
  }

  updateById(id: UserType['id'], updateUserDto: Partial<UserType>) {
    const users = this.database
      .update(usersSchema)
      .set(updateUserDto)
      .where(eq(usersSchema.id, id))
      .run();

    return users;
  }

  incrementAllBalances(value: number, where?: SQL) {
    const query = this.database.update(usersSchema).set({
      balance: sql`(select balance + ${value} FROM ${usersSchema} as t1 where users.id = t1.id);`,
    });

    if (where) return query.where(where).run();

    query.run();
  }
}