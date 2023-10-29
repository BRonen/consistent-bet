import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RepositoriesService } from '../repositories/repositories.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DB, DbType } from '../database/database.provider';

@Injectable()
export class PaymentsService {
  constructor(private readonly repositories: RepositoriesService, @Inject(DB) private readonly database: DbType) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.repositories.payment.create(createPaymentDto);
  }

  findAll() {
    return this.repositories.payment.findAll();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processNewPayments() {
    await this.database.transaction(async (tx) => {
      const payment = await this.repositories.payment.getNotProcessedPayment(tx);

      await Promise.all([
        this.repositories.ledger.withdraw(tx, payment.senderId, payment.amount),
        this.repositories.ledger.deposit(tx, payment.receiverId, payment.amount),
        this.repositories.payment.setPaymentAsProcessed(tx, payment.id)
      ]);
    });
  }
}
