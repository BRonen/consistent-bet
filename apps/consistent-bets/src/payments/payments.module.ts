import { Module } from '@nestjs/common';
import { TransactionsService } from './payments.service';
import { TransactionsController } from './payments.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
