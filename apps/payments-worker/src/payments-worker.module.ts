import { Module } from '@nestjs/common';
import { DatabaseModule } from '@consistent-bets/database/database.module';
import { PaymentsWorkerController } from './payments-worker.controller';
import { PaymentsWorkerService } from './payments-worker.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [PaymentsWorkerController],
  providers: [PaymentsWorkerService],
})
export class PaymentsWorkerModule {}
