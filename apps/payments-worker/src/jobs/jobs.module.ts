import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [JobsService],
})
export class JobsModule {}
