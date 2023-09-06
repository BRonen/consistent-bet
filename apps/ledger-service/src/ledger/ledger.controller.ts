import { Controller } from '@nestjs/common';
import { RepositoriesService } from '../repositories/repositories.service';
import {
  Ctx,
  GrpcMethod,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class LedgerController {
  constructor(private readonly repositories: RepositoriesService) {}

  @GrpcMethod('LedgerService', 'FindOne')
  async findOne(data: any) {
    console.log(data);
    const a = await this.repositories.ledger.findById(data.id);

    console.log(a);
    return a || { id: 0, balance: 0 };
  }

  @MessagePattern('teste')
  async handleMessagePrinted2(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(payload);

    channel.ack(originalMsg);
  }

  @MessagePattern('CREATE_LEDGER')
  async handleMessagePrinted(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('eawadawdwdawdawdaawdwd\n\n\n\n');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.repositories.ledger.create({
      id: payload.user_id,
      balance: 100,
    });

    channel.ack(originalMsg);
  }
}
