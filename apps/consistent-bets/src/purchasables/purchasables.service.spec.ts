import { Test, TestingModule } from '@nestjs/testing';
import { PurchasablesService } from './purchasables.service';

describe('PurchasablesService', () => {
  let service: PurchasablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasablesService],
    }).compile();

    service = module.get<PurchasablesService>(PurchasablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
