import { Module } from '@nestjs/common';
import { BetableService } from './betables.service';
import { BetableController } from './betables.controller';

@Module({
  controllers: [BetableController],
  providers: [BetableService],
})
export class BetableModule {}
