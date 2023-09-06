import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../database/database.provider';
import { UserRepository } from './user.repository';
import { OutboxEventsRepository } from './outboxEvents.repositories';

@Injectable()
export class RepositoriesService {
  public user: UserRepository;
  public outboxEvents: OutboxEventsRepository;

  constructor(@Inject(DB) database: DbType) {
    this.user = new UserRepository(database);
    this.outboxEvents = new OutboxEventsRepository(database);
  }
}
