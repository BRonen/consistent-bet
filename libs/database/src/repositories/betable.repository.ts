import { Inject } from '@nestjs/common';
import { InferModel } from 'drizzle-orm';
import { betableSchema } from '../schema';
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