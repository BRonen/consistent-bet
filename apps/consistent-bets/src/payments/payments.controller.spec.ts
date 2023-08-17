import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsCrontroller } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsCrontroller', () => {
  let controller: PaymentsCrontroller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsCrontroller],
      providers: [PaymentsService],
    }).compile();

    controller = module.get<PaymentsCrontroller>(PaymentsCrontroller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
