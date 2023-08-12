import { Inject } from '@nestjs/common';
import { InferModel } from 'drizzle-orm';
import { transactionsSchema } from '../schema';
import { DB, DbType } from '../database.provider';

export class TransactionRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  create(
    createTransactionDto: InferModel<typeof transactionsSchema, 'insert'>,
  ) {
    const query = this.database
      .insert(transactionsSchema)
      .values(createTransactionDto)
      .returning();

    const [user] = query.values();

    return user;
  }

  findAll() {
    const users = this.database
      .select({
        id: transactionsSchema.id,
        status: transactionsSchema.status,
        amount: transactionsSchema.amount,
        receiverId: transactionsSchema.receiverId,
        senderId: transactionsSchema.senderId,
      })
      .from(transactionsSchema)
      .all();

    return users;
  }
}
