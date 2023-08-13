import { Controller, Get, Param } from '@nestjs/common';
import { BetableService } from './betables.service';

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
}
