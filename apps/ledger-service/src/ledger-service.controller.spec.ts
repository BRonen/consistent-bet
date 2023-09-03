import { Test, TestingModule } from '@nestjs/testing';
import { LedgerServiceController } from './ledger-service.controller';

describe('LedgerServiceController', () => {
  let ledgerServiceController: LedgerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LedgerServiceController],
    }).compile();

    ledgerServiceController = app.get<LedgerServiceController>(
      LedgerServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ledgerServiceController.healthcheck()).toBe('running');
    });
  });
});
