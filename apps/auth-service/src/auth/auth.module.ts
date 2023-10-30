import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEnviroment } from '../auth-environment';
import { RepositoriesModule } from '../repositories/repositories.module';

const { env } = new AuthEnviroment();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    RepositoriesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
