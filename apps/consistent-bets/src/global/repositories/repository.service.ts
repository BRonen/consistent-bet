import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DB, DbType } from '../database.provider';

@Injectable()
export class RepositoryService {
  public user: UserRepository;

  constructor(@Inject(DB) private readonly database: DbType) {
    this.user = new UserRepository(database);
  }
}
