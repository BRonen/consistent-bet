import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class PaymentsService {
  constructor(private repos: RepositoryService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { id, status, amount, receiverId, senderId } =
      await this.repos.payment.create(createPaymentDto);
    return { id, status, amount, receiverId, senderId };
  }

  async findAll() {
    const Payments = await this.repos.payment.findAll();

    return Payments;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
