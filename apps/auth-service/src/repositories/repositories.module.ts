import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { DB, DatabaseProvider } from '../database/database.provider';
@Module({
    providers: [RepositoriesService, DatabaseProvider],
    exports: [DB, RepositoriesService],
})
export class RepositoriesModule {}
