import { Inject } from '@nestjs/common';
import { InferModel, eq } from 'drizzle-orm';
import { purchasableSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class PurchasableRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createTransactionDto: InferModel<typeof purchasableSchema, 'insert'>,
  ) {
    const [purchasable] = await this.database
      .insert(purchasableSchema)
      .values(createTransactionDto)
      .returning();

    return purchasable;
  }

  async findAll() {
    const purchasables = await this.database
      .select({
        id: purchasableSchema.id,
        name: purchasableSchema.name,
        price: purchasableSchema.price,
      })
      .from(purchasableSchema);

    return purchasables;
  }

  async findById(id: number) {
    const [purchasables] = await this.database
      .select({
        id: purchasableSchema.id,
        name: purchasableSchema.name,
        price: purchasableSchema.price,
      })
      .from(purchasableSchema)
      .where(eq(purchasableSchema.id, id))
      .limit(1);

    return purchasables;
  }
}
