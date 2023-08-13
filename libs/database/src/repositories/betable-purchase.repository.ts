import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { betablePurchaseSchema, betableSchema, usersSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class BetablePurchaseRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createPurchaseDto: InferModel<typeof betablePurchaseSchema, 'insert'>,
  ) {
    const [betable] = await this.database
      .insert(betablePurchaseSchema)
      .values(createPurchaseDto)
      .returning();

    return betable;
  }

  async findAll() {
    const purchases = await this.database
      .select({
        id: betablePurchaseSchema.id,
        status: betablePurchaseSchema.status,
        isSell: betablePurchaseSchema.isSell,
        buyerId: betablePurchaseSchema.buyerId,
        betableId: betablePurchaseSchema.betableId,
      })
      .from(betablePurchaseSchema);

    return purchases;
  }

  async processPurchase() {
    return await this.database.transaction(async (tx) => {
      await tx.execute(sql`LOCK TABLE transactions IN ROW EXCLUSIVE MODE;`);

      const [purchase] = await tx
        .select()
        .from(betablePurchaseSchema)
        .where(sql`${betablePurchaseSchema.status} = 'processing' FOR UPDATE`)
        .limit(1);

      if(!purchase) return;

      const [betable] = await tx
        .select()
        .from(betableSchema)
        .where(sql`${betableSchema.id} = ${purchase.betableId} FOR UPDATE`)
        .limit(1);

      const [updatedBetable] = await Promise.all([
        tx
          .update(betableSchema)
          .set({ price: Math.floor(purchase.isSell? betable.price * 0.9 : betable.price * 1.1) })
          .where(eq(betableSchema.id, purchase.betableId))
          .returning(),
        tx
          .update(betablePurchaseSchema)
          .set({ status: 'processed' })
          .where(eq(betablePurchaseSchema.id, purchase.id))
          .returning(),
        tx
          .update(usersSchema)
          .set({
            balance:
            purchase.isSell
                ? sql`${usersSchema.balance} + ${Math.floor(betable.price * 0.9)}`
                : sql`${usersSchema.balance} - ${Math.floor(betable.price * 1)}`
          })
          .where(eq(usersSchema.id, purchase.buyerId)),
      ]);

      return updatedBetable;
    });
  }
}
