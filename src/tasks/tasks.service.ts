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

    this.repos.user.incrementAllBalances(10000);
  }
}