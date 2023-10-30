import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthServiceController {
  @Get('/healthz')
  healthcheck() {
    return 'running';
  }
}
