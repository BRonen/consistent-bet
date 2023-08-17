import { Module } from '@nestjs/common';
import { PurchasablesService } from './purchasables.service';
import { PurchasablesController } from './purchasables.controller';

@Module({
  controllers: [PurchasablesController],
  providers: [PurchasablesService],
})
export class PurchasablesModule {}
