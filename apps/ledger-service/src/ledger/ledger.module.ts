import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LedgerService } from './ledger.service';

@Module({
  imports: [RepositoriesModule],
  providers: [LedgerService],
  controllers: [LedgerController],
})
export class LedgerModule {}
