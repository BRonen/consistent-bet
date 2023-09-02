import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AuthServiceController],
})
export class AuthServiceModule {}
