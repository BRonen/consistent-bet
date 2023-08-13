import { Inject } from '@nestjs/common';
import { InferModel } from 'drizzle-orm';
import { transactionsSchema } from '../schema';
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
}
