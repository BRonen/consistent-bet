import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
