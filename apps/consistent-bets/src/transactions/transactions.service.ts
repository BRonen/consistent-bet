import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class TransactionsService {
  constructor(private repos: RepositoryService) {}

  create(createTransactionDto: CreateTransactionDto) {
    const [id, status, amount, receiverId, senderId] =
      this.repos.transaction.create(createTransactionDto);
    return { id, status, amount, receiverId, senderId };
  }

  findAll() {
    const transactions = this.repos.transaction.findAll();
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, _updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
