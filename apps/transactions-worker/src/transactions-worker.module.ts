import { Module } from '@nestjs/common';
import { DatabaseModule } from '@consistent-bets/database/database.module';
import { TransactionsWorkerController } from './transactions-worker.controller';
import { TransactionsWorkerService } from './transactions-worker.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [TransactionsWorkerController],
  providers: [TransactionsWorkerService],
})
export class TransactionsWorkerModule {}
