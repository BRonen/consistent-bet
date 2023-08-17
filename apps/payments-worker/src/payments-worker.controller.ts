import { Controller, Get } from '@nestjs/common';
import { PaymentsWorkerService } from './payments-worker.service';

@Controller()
export class PaymentsWorkerController {
  constructor(
    private readonly PaymentsWorkerService: PaymentsWorkerService,
  ) {}

  @Get()
  getHello(): string {
    return this.PaymentsWorkerService.getHello();
  }
}
