import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { paymentSchema, userSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class TransactionRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createTransactionDto: InferModel<typeof paymentSchema, 'insert'>,
  ) {
    const [user] = await this.database
      .insert(paymentSchema)
      .values(createTransactionDto)
      .returning();

    return user;
  }

  async findAll() {
    const users = await this.database
      .select({
        id: paymentSchema.id,
        status: paymentSchema.status,
        amount: paymentSchema.amount,
        receiverId: paymentSchema.receiverId,
        senderId: paymentSchema.senderId,
      })
      .from(paymentSchema);

    return users;
  }

  async processById() {
    await this.database.transaction(async (tx) => {
      await tx.execute(sql`LOCK TABLE transactions IN ROW EXCLUSIVE MODE;`);
      const [transaction] = await tx
        .select()
        .from(paymentSchema)
        .limit(1)
        .where(sql`${paymentSchema.status} = 'processing' FOR UPDATE`);

      if (!transaction) return;

      await Promise.all([
        tx
          .update(userSchema)
          .set({ balance: sql`${userSchema.balance} - ${transaction.amount}` })
          .where(eq(userSchema.id, transaction.senderId)),
        tx
          .update(userSchema)
          .set({ balance: sql`${userSchema.balance} + ${transaction.amount}` })
          .where(eq(userSchema.id, transaction.receiverId)),
        tx
          .update(paymentSchema)
          .set({ status: 'processed' })
          .where(eq(paymentSchema.id, transaction.id)),
      ]);
    });
  }
}
