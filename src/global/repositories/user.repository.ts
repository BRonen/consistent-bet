import { Inject } from '@nestjs/common';
import { InferModel, eq } from 'drizzle-orm';
import { usersSchema } from 'src/schema';
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
      })
      .from(usersSchema)
      .all();

    return users;
  }
}
