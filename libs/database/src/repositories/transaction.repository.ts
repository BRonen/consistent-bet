import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { transactionsSchema, usersSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class TransactionRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(
    createTransactionDto: InferModel<typeof transactionsSchema, 'insert'>,
  ) {
    const [user] = await this.database
      .insert(transactionsSchema)
      .values(createTransactionDto)
      .returning();

    return user;
  }

  async findAll() {
    const users = await this.database
      .select({
        id: transactionsSchema.id,
        status: transactionsSchema.status,
        amount: transactionsSchema.amount,
        receiverId: transactionsSchema.receiverId,
        senderId: transactionsSchema.senderId,
      })
      .from(transactionsSchema);

    return users;
  }

  async processById() {
    await this.database.transaction(async (tx) => {
      await tx.execute(sql`LOCK TABLE transactions IN ROW EXCLUSIVE MODE;`);
      const [transaction] = await tx
        .select()
        .from(transactionsSchema)
        .limit(1)
        .where(sql`${transactionsSchema.status} = 'processing' FOR UPDATE`);

      if (!transaction) return;

      await Promise.all([
        tx
          .update(usersSchema)
          .set({ balance: sql`${usersSchema.balance} - ${transaction.amount}` })
          .where(eq(usersSchema.id, transaction.senderId)),
        tx
          .update(usersSchema)
          .set({ balance: sql`${usersSchema.balance} + ${transaction.amount}` })
          .where(eq(usersSchema.id, transaction.receiverId)),
        tx
          .update(transactionsSchema)
          .set({ status: 'processed' })
          .where(eq(transactionsSchema.id, transaction.id)),
      ]);
    });
  }
}
