import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCrontroller } from './payments.controller';

@Module({
  controllers: [PaymentsCrontroller],
  providers: [PaymentsService],
})
export class PaymentsModule {}
