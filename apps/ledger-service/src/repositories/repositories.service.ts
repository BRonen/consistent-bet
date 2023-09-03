import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../database/database.provider';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class RepositoriesService {
  public payment: PaymentRepository;

  constructor(@Inject(DB) database: DbType) {
    this.payment = new PaymentRepository(database);
  }
}
