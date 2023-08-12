import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsWorkerController } from './transactions-worker.controller';
import { TransactionsWorkerService } from './transactions-worker.service';

describe('TransactionsWorkerController', () => {
  let transactionsWorkerController: TransactionsWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsWorkerController],
      providers: [TransactionsWorkerService],
    }).compile();

    transactionsWorkerController = app.get<TransactionsWorkerController>(TransactionsWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(transactionsWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
