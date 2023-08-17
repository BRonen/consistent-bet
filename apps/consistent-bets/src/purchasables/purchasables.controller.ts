import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PurchasablesService } from './purchasables.service';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post(':id/buy')
  buyOne(@Request() res, @Param('id') id: string) {
    return this.purchasablesService.buyOne(+id, res.user.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/sell')
  sellOne(@Request() res, @Param('id') id: string) {
    return this.purchasablesService.sellOne(+id, res.user.id);
  }
}
