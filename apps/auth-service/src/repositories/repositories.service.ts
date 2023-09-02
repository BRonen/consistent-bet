import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../database/database.provider';
import { UserRepository } from './user.repository';

@Injectable()
export class RepositoriesService {
  public user: UserRepository;

  constructor(@Inject(DB) database: DbType) {
    this.user = new UserRepository(database);
  }
}
