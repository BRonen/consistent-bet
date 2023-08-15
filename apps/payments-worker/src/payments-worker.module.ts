import { Module } from '@nestjs/common';
import { DatabaseModule } from '@consistent-bets/database/database.module';
import { TransactionsWorkerController } from './payments-worker.controller';
import { TransactionsWorkerService } from './payments-worker.service';
import { TasksModule } from './jobs/jobs.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [TransactionsWorkerController],
  providers: [TransactionsWorkerService],
})
export class TransactionsWorkerModule {}
