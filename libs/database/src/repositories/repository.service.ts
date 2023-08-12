import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';
import { DB, DbType } from '../database.provider';

@Injectable()
export class RepositoryService {
  public user: UserRepository;
  public transaction: TransactionRepository;

  constructor(@Inject(DB) private readonly database: DbType) {
    this.user = new UserRepository(database);
    this.transaction = new TransactionRepository(database);
  }
}
