import { Module } from '@nestjs/common';
import { TasksService } from './jobs.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService],
})
export class TasksModule {}
