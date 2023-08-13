import { Global, Module } from '@nestjs/common';
import { DB, DatabaseProvider } from './database.provider';
import { RepositoryService } from './repositories/repository.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseProvider, RepositoryService],
  exports: [DB, RepositoryService],
})
export class DatabaseModule {}
