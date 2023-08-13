import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { betableSchema, usersSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class BetableRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createTransactionDto: InferModel<typeof betableSchema, 'insert'>,
  ) {
    const [betable] = await this.database
      .insert(betableSchema)
      .values(createTransactionDto)
      .returning();

    return betable;
  }

  async findAll() {
    const betables = await this.database
      .select({
        id: betableSchema.id,
        name: betableSchema.name,
        price: betableSchema.price,
      })
      .from(betableSchema);

    return betables;
  }
}
