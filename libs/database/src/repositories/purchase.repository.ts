import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { purchaseSchema, purchasableSchema, userSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class PurchaseRepository {
  constructor(@Inject(DB) private readonly database: DbType) { }

  async create(createPurchaseDto: InferModel<typeof purchaseSchema, 'insert'>) {
    const [betable] = await this.database
      .insert(purchaseSchema)
      .values(createPurchaseDto)
      .returning();

    return betable;
  }

  async findAll() {
    const purchases = await this.database
      .select({
        id: purchaseSchema.id,
        status: purchaseSchema.status,
        isSell: purchaseSchema.isSell,
        buyer: {
          id: userSchema.id,
          name: userSchema.name,
          email: userSchema.email,
        },
        purchasable: {
          id: purchasableSchema.id,
          name: purchasableSchema.name,
        },
      })
      .from(purchaseSchema)
      .leftJoin(userSchema, eq(userSchema.id, purchaseSchema.buyerId))
      .leftJoin(purchasableSchema, eq(purchasableSchema.id, purchaseSchema.purchasableId))

    console.log(purchases)

    return purchases;
  }

  processPurchase() {
    return this.database.transaction(async (tx) => {
      await tx.execute(sql`LOCK TABLE Payments IN ROW EXCLUSIVE MODE;`);

      const [purchase] = await tx
        .select()
        .from(purchaseSchema)
        .where(sql`${purchaseSchema.status} = 'processing' FOR UPDATE`)
        .limit(1);

      if (!purchase) return;

      const [betable] = await tx
        .select()
        .from(purchasableSchema)
        .where(
          sql`${purchasableSchema.id} = ${purchase.purchasableId} FOR UPDATE`,
        )
        .limit(1);

      const [updatedBetable] = await Promise.all([
        tx
          .update(purchasableSchema)
          .set({
            price: Math.floor(
              purchase.isSell ? betable.price * 0.9 : betable.price * 1.1,
            ),
          })
          .where(eq(purchasableSchema.id, purchase.purchasableId))
          .returning(),
        tx
          .update(purchaseSchema)
          .set({ status: 'processed' })
          .where(eq(purchaseSchema.id, purchase.id))
          .returning(),
        tx
          .update(userSchema)
          .set({
            balance: purchase.isSell
              ? sql`${userSchema.balance} + ${Math.floor(betable.price * 0.9)}`
              : sql`${userSchema.balance} - ${Math.floor(betable.price * 1)}`,
          })
          .where(eq(userSchema.id, purchase.buyerId)),
      ]);

      return updatedBetable;
    });
  }
}
