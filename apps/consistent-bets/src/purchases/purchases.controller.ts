import {
  Controller,
  Post,
  Param,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post(':id/buy')
  buyOne(@Request() res, @Param('id') id: string) {
    return this.purchasesService.buyOne(+id, res.user.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/sell')
  sellOne(@Request() res, @Param('id') id: string) {
    return this.purchasesService.sellOne(+id, res.user.id);
  }
}
