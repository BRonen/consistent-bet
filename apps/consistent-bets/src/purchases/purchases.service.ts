import { Injectable } from '@nestjs/common';
import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';

@Injectable()
export class PurchasesService {
  constructor(private repos: RepositoryService) {}

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
