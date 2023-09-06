import { Inject } from '@nestjs/common';
import { InferModel, eq } from 'drizzle-orm';
import { ledgerSchema } from '../schemas';
import { DB, DbType } from '../database/database.provider';

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
  
  async findById(id: number) {
    const [ledger] = await this.database
      .select({
        id: ledgerSchema.id,
        balance: ledgerSchema.balance,
      })
      .from(ledgerSchema)
      .where(eq(ledgerSchema.id, id))
      .limit(1);

    console.log(ledger);

    return ledger;
  }
}
