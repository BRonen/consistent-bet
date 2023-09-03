import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoriesService } from './repositories.service';
import { DB, DatabaseProvider } from '../database/database.provider';
@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [RepositoriesService, DatabaseProvider],
    exports: [DB, RepositoriesService],
})
export class RepositoriesModule {}
