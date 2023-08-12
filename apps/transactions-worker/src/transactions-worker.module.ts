import { Module } from '@nestjs/common';
import { TransactionsWorkerController } from './transactions-worker.controller';
import { TransactionsWorkerService } from './transactions-worker.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [TransactionsWorkerController],
  providers: [TransactionsWorkerService],
})
export class TransactionsWorkerModule {}
