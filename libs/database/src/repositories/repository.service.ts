import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';
import { DB, DbType } from '../database.provider';
import { BetableRepository } from './betable.repository';

@Injectable()
export class RepositoryService {
  public user: UserRepository;
  public transaction: TransactionRepository;
  public betable: BetableRepository;

  constructor(@Inject(DB) private readonly database: DbType) {
    this.user = new UserRepository(database);
    this.transaction = new TransactionRepository(database);
    this.betable = new BetableRepository(database);
  }
}
