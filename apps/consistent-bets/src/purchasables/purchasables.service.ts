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
    return `This action returns a #${id} betable`;
  }

  async buyOne(id: number, userId: number) {
    const purchase = await this.repos.purchase.create({
      isSell: false,
      purchasableId: id,
      buyerId: userId,
    });

    return purchase;
  }

  async sellOne(id: number, userId: number) {
    const purchase = await this.repos.purchase.create({
      isSell: true,
      purchasableId: id,
      buyerId: userId,
    });

    return purchase;
  }
}
