import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@consistent-bets/database/database.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
