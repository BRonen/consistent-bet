import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../database.provider';
import { UserRepository } from './user.repository';
import { PaymentRepository } from './payment.repository';
import { PurchasableRepository } from './purchasable.repository';
import { PurchaseRepository } from './purchase.repository';

//TODO: Split services persistence between diferents databases connections
@Injectable()
export class RepositoryService {
  public user: UserRepository;
  public payment: PaymentRepository;
  public purchasable: PurchasableRepository;
  public purchase: PurchaseRepository;

  constructor(@Inject(DB) database: DbType) {
    this.user = new UserRepository(database);
    this.payment = new PaymentRepository(database);
    this.purchasable = new PurchasableRepository(database);
    this.purchase = new PurchaseRepository(database);
  }
}
