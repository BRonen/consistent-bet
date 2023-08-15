import { Controller, Get } from '@nestjs/common';
import { TransactionsWorkerService } from './payments-worker.service';

@Controller()
export class TransactionsWorkerController {
  constructor(
    private readonly transactionsWorkerService: TransactionsWorkerService,
  ) {}

  @Get()
  getHello(): string {
    return this.transactionsWorkerService.getHello();
  }
}
