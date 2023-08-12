import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GlobalModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
