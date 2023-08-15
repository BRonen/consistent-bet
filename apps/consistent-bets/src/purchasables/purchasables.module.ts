import { Module } from '@nestjs/common';
import { BetableService } from './purchasables.service';
import { BetableController } from './purchasables.controller';

@Module({
  controllers: [BetableController],
  providers: [BetableService],
})
export class BetableModule {}
