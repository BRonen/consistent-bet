import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BetableService } from './purchasables.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('betables')
export class BetableController {
  constructor(private readonly betableService: BetableService) {}
  @Get()
  findAll() {
    return this.betableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.betableService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/buy')
  buyOne(@Request() res, @Param('id') id: string) {
    return this.betableService.buyOne(+id, res.user.id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/sell')
  sellOne(@Request() res, @Param('id') id: string) {
    return this.betableService.sellOne(+id, res.user.id);
  }
}
