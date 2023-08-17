import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private repos: RepositoryService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called every 10 seconds');

    this.repos.user.incrementAllBalances(10000);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handlePaymentsProcess() {
    this.logger.debug('Processing one transaction');

    this.repos.transaction.processById();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handlePurchaseProcess() {
    this.logger.debug('Processing one purchase');

    this.repos.betablePurchase.processPurchase();
  }
}
