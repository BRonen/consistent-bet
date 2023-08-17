import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-payment.dto';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class PaymentsService {
  constructor(private repos: RepositoryService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { id, status, amount, receiverId, senderId } =
      await this.repos.transaction.create(createTransactionDto);
    return { id, status, amount, receiverId, senderId };
  }

  async findAll() {
    const Payments = await this.repos.transaction.findAll();

    return Payments;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
