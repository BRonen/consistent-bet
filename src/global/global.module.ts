import { Global, Module } from '@nestjs/common';
import { DB, DatabaseProvider } from './database.provider';
import { RepositoryService } from './repositories/repository.service';

@Global()
@Module({
  providers: [DatabaseProvider, RepositoryService],
  exports: [DB, RepositoryService],
})
export class GlobalModule {}
