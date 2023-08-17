import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('Payments')
export class PaymentsCrontroller {
  constructor(private readonly PaymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentsDto: CreatePaymentDto) {
    return this.PaymentsService.create(createPaymentsDto);
  }

  @Get()
  findAll() {
    return this.PaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PaymentsService.findOne(+id);
  }
}
