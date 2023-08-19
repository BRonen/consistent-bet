import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchasablesService {
  constructor(private repos: RepositoryService) {}

  async findAll() {
    const purchasables = await this.repos.purchasable.findAll();

    return purchasables;
  }

  findOne(id: number) {
    return this.repos.purchasable.findById(id);
  }
}
