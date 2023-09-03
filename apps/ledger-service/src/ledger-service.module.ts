import { Module } from '@nestjs/common';
import { LedgerServiceController } from './ledger-service.controller';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PaymentsModule],
  controllers: [LedgerServiceController],
})
export class LedgerServiceModule {}
