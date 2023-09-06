import { Module } from '@nestjs/common';

import { AuthServiceController } from './auth-service.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from '@nestjs/microservices';
import { getLedgerClient } from './ledger.client';
import { getQueueClient } from './queue.client';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ClientsModule.register({
      clients: [getLedgerClient(), getQueueClient()],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthServiceController],
})
export class AuthServiceModule {}
