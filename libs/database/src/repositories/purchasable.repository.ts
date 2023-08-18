import { Inject } from '@nestjs/common';
import { InferModel } from 'drizzle-orm';
import { purchasableSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class PurchasableRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createTransactionDto: InferModel<typeof purchasableSchema, 'insert'>,
  ) {
    const [betable] = await this.database
      .insert(purchasableSchema)
      .values(createTransactionDto)
      .returning();

    return betable;
  }

  async findAll() {
    const betables = await this.database
      .select({
        id: purchasableSchema.id,
        name: purchasableSchema.name,
        price: purchasableSchema.price,
      })
      .from(purchasableSchema);

    return betables;
  }
}
