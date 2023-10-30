import { Inject } from '@nestjs/common';
import { InferModel, eq, sql } from 'drizzle-orm';
import { ledgerSchema } from '../schemas';
import { DB, DbTransaction, DbType } from '../database/database.provider';

export class LedgerRepository {
  constructor(@Inject(DB) private readonly database: DbType) {}

  async create(createLedgerDto: InferModel<typeof ledgerSchema, 'insert'>) {
    const [ledger] = await this.database
      .insert(ledgerSchema)
      .values(createLedgerDto)
      .returning();

    return ledger;
  }

  async findAll() {
    const payments = await this.database
      .select({
        id: ledgerSchema.id,
        balance: ledgerSchema.balance,
      })
      .from(ledgerSchema);

    return payments;
  }

  async findById(id: number, tx?: DbTransaction, lock?: boolean) {
    const db = tx || this.database;
    const [ledger] = await db
      .select({
        id: ledgerSchema.id,
        balance: ledgerSchema.balance,
      })
      .from(ledgerSchema)
      .where(lock? sql`${ledgerSchema.id} = ${id} FOR UPDATE` : eq(ledgerSchema.id, id))
      .limit(1);

    console.log(ledger);

    return ledger;
  }

  withdraw(tx: DbTransaction, ledgerId: number, amount: number){
    return tx
      .update(ledgerSchema)
      .set({ balance: sql`${ledgerSchema.balance} - ${amount}` })
      .where(eq(ledgerSchema.id, ledgerId));
  }

  deposit(tx: DbTransaction, ledgerId: number, amount: number) {
    return tx
    .update(ledgerSchema)
    .set({ balance: sql`${ledgerSchema.balance} + ${amount}` })
    .where(eq(ledgerSchema.id, ledgerId));
  }
}
