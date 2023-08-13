import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';
import { DB, DbType } from '../database.provider';
import { BetableRepository } from './betable.repository';
import { BetablePurchaseRepository } from './betable-purchase.repository';

@Injectable()
export class RepositoryService {
  public user: UserRepository;
  public transaction: TransactionRepository;
  public betable: BetableRepository;
  public betablePurchase: BetablePurchaseRepository;

  constructor(@Inject(DB) database: DbType) {
    this.user = new UserRepository(database);
    this.transaction = new TransactionRepository(database);
    this.betable = new BetableRepository(database);
    this.betablePurchase = new BetablePurchaseRepository(database);
  }
}
