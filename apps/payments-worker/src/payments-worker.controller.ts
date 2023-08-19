import { Controller, Get } from '@nestjs/common';
import { PaymentsWorkerService } from './payments-worker.service';

@Controller()
export class PaymentsWorkerController {
  constructor(private readonly paymentsWorkerService: PaymentsWorkerService) {}

  @Get()
  getHealthcheck(): string {
    return this.paymentsWorkerService.getHealthcheck();
  }
}
