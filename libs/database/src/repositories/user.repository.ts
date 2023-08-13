import { Inject } from '@nestjs/common';
import { InferModel, SQL, eq, sql } from 'drizzle-orm';
import { UserType, usersSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class UserRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async getUserHashByEmail(email) {
    const [user] = await this.database
      .select({
        id: usersSchema.id,
        name: usersSchema.name,
        hash: usersSchema.password,
      })
      .from(usersSchema)
      .where(eq(usersSchema.email, email));

    return user;
  }

  async create(createUserDto: InferModel<typeof usersSchema, 'insert'>) {
    const query = await this.database
      .insert(usersSchema)
      .values(createUserDto)
      .returning();

    const [user] = query.values();

    return user;
  }

  async findAll() {
    const users = this.database
      .select({
        id: usersSchema.id,
        name: usersSchema.name,
        email: usersSchema.email,
        balance: usersSchema.balance,
      })
      .from(usersSchema);

    return users;
  }

  async updateById(id: UserType['id'], updateUserDto: Partial<UserType>) {
    const users = await this.database
      .update(usersSchema)
      .set(updateUserDto)
      .where(eq(usersSchema.id, id));

    return users;
  }

  incrementAllBalances(value: number, where?: SQL) {
    const query = this.database.update(usersSchema).set({
      balance: sql`(select balance + ${value} FROM ${usersSchema} as t1 where users.id = t1.id);`,
    });

    if (where) return query.where(where).execute();

    return query.execute();
  }
}
