import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private repos: RepositoryService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called every 10 seconds');

    this.repos.user.incrementAllBalances(10000);
  }
  
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron2() {
    this.logger.debug('Called every 10² seconds start');

    //while(true) continue;
    
    this.logger.debug('Called every 10² seconds end');
  }
}
