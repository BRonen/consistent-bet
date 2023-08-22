import { Controller, Get, Param } from '@nestjs/common';
import { PurchasablesService } from './purchasables.service';

@Controller('purchasables')
export class PurchasablesController {
  constructor(private readonly purchasablesService: PurchasablesService) {}
  @Get()
  findAll() {
    return this.purchasablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasablesService.findOne(+id);
  }
}
