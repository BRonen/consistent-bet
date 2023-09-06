import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../database/database.provider';
import { PaymentRepository } from './payment.repository';
import { LedgerRepository } from './ledger.repository';

@Injectable()
export class RepositoriesService {
  public payment: PaymentRepository;
  public ledger: LedgerRepository;

  constructor(@Inject(DB) database: DbType) {
    this.payment = new PaymentRepository(database);
    this.ledger = new LedgerRepository(database);
  }
}
