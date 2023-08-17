import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsWorkerController } from './payments-worker.controller';
import { PaymentsWorkerService } from './payments-worker.service';

describe('PaymentsWorkerController', () => {
  let PaymentsWorkerController: PaymentsWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsWorkerController],
      providers: [PaymentsWorkerService],
    }).compile();

    PaymentsWorkerController = app.get<PaymentsWorkerController>(
      PaymentsWorkerController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(PaymentsWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
