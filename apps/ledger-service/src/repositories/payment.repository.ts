import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { ledgerSchema, paymentSchema } from '../schemas';
import { DB, DbType } from '../database/database.provider';

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

  async processPendingPayment() {
    await this.database.transaction(async (tx) => {
      const [payment] = await tx
        .select()
        .from(paymentSchema)
        .limit(1)
        .where(sql`${paymentSchema.status} = 'processing' FOR SHARE`);

      if (!payment) return;

      await Promise.all([
        tx
          .update(ledgerSchema)
          .set({ balance: sql`${ledgerSchema.balance} - ${payment.amount}` })
          .where(eq(ledgerSchema.id, payment.senderId)),
        tx
          .update(ledgerSchema)
          .set({ balance: sql`${ledgerSchema.balance} + ${payment.amount}` })
          .where(eq(ledgerSchema.id, payment.receiverId)),
        tx
          .update(paymentSchema)
          .set({ status: 'processed' })
          .where(eq(paymentSchema.id, payment.id)),
      ]);
    });
  }
}
