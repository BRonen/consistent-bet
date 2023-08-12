
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RepositoryService } from 'src/global/repositories/repository.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private repos: RepositoryService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called every 10 seconds');

    // TODO: fix race condition
    this.repos.user.findAll().forEach(user => {
      this.repos.user.updateById(user.id, { balance: user.balance + 1 });
    });
  }
}