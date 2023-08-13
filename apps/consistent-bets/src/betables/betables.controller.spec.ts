import { Test, TestingModule } from '@nestjs/testing';
import { BetableController } from './betables.controller';
import { BetableService } from './betables.service';

describe('BetableController', () => {
  let controller: BetableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetableController],
      providers: [BetableService],
    }).compile();

    controller = module.get<BetableController>(BetableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
