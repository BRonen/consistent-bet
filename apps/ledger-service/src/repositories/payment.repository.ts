import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { paymentSchema } from '../schemas';
import { DB, DbTransaction, DbType } from '../database/database.provider';

export class PaymentRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(createPaymentDto: InferModel<typeof paymentSchema, 'insert'>) {
    const [user] = await this.database
      .insert(paymentSchema)
      .values(createPaymentDto)
      .returning();

    return user;
  }

  async findAll() {
    const payments = await this.database
      .select({
        id: paymentSchema.id,
        status: paymentSchema.status,
        amount: paymentSchema.amount,
        receiver: paymentSchema.receiverId,
        sender: paymentSchema.senderId,
      })
      .from(paymentSchema);

    return payments;
  }

  async getNotProcessedPayment(tx: DbTransaction) {
    const [payment] = await tx
      .select()
      .from(paymentSchema)
      .limit(1)
      .where(sql`${paymentSchema.status} = 'not_processed' FOR SHARE`);

    return payment;
  }

  setPaymentAsProcessed(tx: DbTransaction, paymentId: number){
    return tx
      .update(paymentSchema)
      .set({ status: 'processed' })
      .where(eq(paymentSchema.id, paymentId));
  }
}
