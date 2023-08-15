import { Test, TestingModule } from '@nestjs/testing';
import { BetableService } from './purchasables.service';

describe('BetableService', () => {
  let service: BetableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetableService],
    }).compile();

    service = module.get<BetableService>(BetableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
