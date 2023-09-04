import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class LedgerServiceController {
  @Get('/healthz')
  healthcheck(): string {
    return 'running';
  }

  @GrpcMethod('hero', 'FindOne')
  findOne(data: any): any {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  private a = true;

  @MessagePattern('notifications')
  async handleMessagePrinted(
    @Payload() subscriber: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (this.a) throw new Error('wasd');

    channel.ack(originalMsg);

    return 'awaaa';
  }
}
