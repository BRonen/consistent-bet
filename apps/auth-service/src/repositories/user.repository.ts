import { Inject } from '@nestjs/common';
import { InferModel, eq } from 'drizzle-orm';
import { UserType, outboxEventSchema, userSchema } from '../schemas';
import { DB, DbType } from '../database/database.provider';

export class UserRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async getUserHashByEmail(email) {
    const [user] = await this.database
      .select({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        hash: userSchema.password,
      })
      .from(userSchema)
      .where(eq(userSchema.email, email));

    return user;
  }

  async create(createUserDto: InferModel<typeof userSchema, 'insert'>) {
    return await this.database.transaction(async (tx) => {
      const [user] = await tx
        .insert(userSchema)
        .values(createUserDto)
        .returning({
          id: userSchema.id,
          name: userSchema.name,
          email: userSchema.email,
        });

      await tx.insert(outboxEventSchema).values({
        event_name: 'CREATE_LEDGER',
        user_id: user.id,
      });

      return user;
    });
  }

  async findAll() {
    const users = this.database
      .select({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
      })
      .from(userSchema);

    return users;
  }

  async findById(id: number) {
    const [user] = await this.database
      .select({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
      })
      .from(userSchema)
      .where(eq(userSchema.id, id))
      .limit(1);

    return user;
  }

  async updateById(id: UserType['id'], updateUserDto: Partial<UserType>) {
    const users = await this.database
      .update(userSchema)
      .set(updateUserDto)
      .where(eq(userSchema.id, id));

    return users;
  }
}
