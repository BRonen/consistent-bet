import { Test, TestingModule } from '@nestjs/testing';
import { PurchasablesController } from './purchasables.controller';
import { PurchasablesService } from './purchasables.service';

describe('PurchasablesController', () => {
  let controller: PurchasablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasablesController],
      providers: [PurchasablesService],
    }).compile();

    controller = module.get<PurchasablesController>(PurchasablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
