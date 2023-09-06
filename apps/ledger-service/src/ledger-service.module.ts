import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LedgerServiceController } from './ledger-service.controller';
import { PaymentsModule } from './payments/payments.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PaymentsModule,
    LedgerModule,
  ],
  controllers: [LedgerServiceController],
})
export class LedgerServiceModule {}
