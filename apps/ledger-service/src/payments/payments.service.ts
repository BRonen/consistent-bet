import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RepositoriesService } from '../repositories/repositories.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PaymentsService {
  constructor (
    private readonly repositories: RepositoriesService,
  ) { }

  create(createPaymentDto: CreatePaymentDto) {
    return this.repositories.payment.create(createPaymentDto);
  }

  findAll() {
    return this.repositories.payment.findAll();
  }

  @Cron(CronExpression.EVERY_SECOND)
  processNewPayments() {
    // const logger = new Logger('Cron');

    // logger.debug('Processing one purchase');

    this.repositories.payment.processPendingPayment();
  }
}
