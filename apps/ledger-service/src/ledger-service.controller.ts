import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class LedgerServiceController {
  @Get('/healthz')
  healthcheck(): string {
    return 'running';
  }

  @GrpcMethod('hero', 'FindOne')
  findOne(data: any, metadata: any, call: any): any {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
