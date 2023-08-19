import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsWorkerService {
  getHealthcheck(): string {
    return 'running';
  }
}
