import { RepositoryService } from '@consistent-bets/database/repositories/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BetableService {
  constructor(
    private repos: RepositoryService
  ) { }

  async findAll() {
    const betables = await this.repos.betable.findAll();
    
    return betables;
  }

  findOne(id: number) {
    return `This action returns a #${id} betable`;
  }
}
