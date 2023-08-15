import { Inject } from '@nestjs/common';
import { InferModel, SQL, eq, sql } from 'drizzle-orm';
import { UserType, userSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class UserRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async getUserHashByEmail(email) {
    const [user] = await this.database
      .select({
        id: userSchema.id,
        name: userSchema.name,
        hash: userSchema.password,
      })
      .from(userSchema)
      .where(eq(userSchema.email, email));

    return user;
  }

  async create(createUserDto: InferModel<typeof userSchema, 'insert'>) {
    const query = await this.database
      .insert(userSchema)
      .values(createUserDto)
      .returning();

    const [user] = query.values();

    return user;
  }

  async findAll() {
    const users = this.database
      .select({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        balance: userSchema.balance,
      })
      .from(userSchema);

    return users;
  }

  async updateById(id: UserType['id'], updateUserDto: Partial<UserType>) {
    const users = await this.database
      .update(userSchema)
      .set(updateUserDto)
      .where(eq(userSchema.id, id));

    return users;
  }

  incrementAllBalances(value: number, where?: SQL) {
    const query = this.database.update(userSchema).set({
      balance: sql`(select balance + ${value} FROM ${userSchema} as t1 where users.id = t1.id);`,
    });

    if (where) return query.where(where).execute();

    return query.execute();
  }
}
