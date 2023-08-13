import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class TransactionsService {
  constructor(private repos: RepositoryService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { id, status, amount, receiverId, senderId } =
      await this.repos.transaction.create(createTransactionDto);
    return { id, status, amount, receiverId, senderId };
  }

  async findAll() {
    const transactions = await this.repos.transaction.findAll();

    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
