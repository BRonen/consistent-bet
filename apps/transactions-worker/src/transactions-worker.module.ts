import { Module } from '@nestjs/common';
import { TransactionsWorkerController } from './transactions-worker.controller';
import { TransactionsWorkerService } from './transactions-worker.service';

@Module({
  imports: [],
  controllers: [TransactionsWorkerController],
  providers: [TransactionsWorkerService],
})
export class TransactionsWorkerModule {}
