import { Controller, Get } from '@nestjs/common';

@Controller()
export class LedgerServiceController {
  @Get('/healthz')
  healthcheck(): string {
    return 'running';
  }
}
