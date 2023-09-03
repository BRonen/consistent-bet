import { Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices';
import path from 'path';

import { AuthServiceController, AuthServiceService } from './auth-service.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthEnviroment } from './auth-environment';

const getConfigGRPC = (): ClientsModuleOptions => {
  const { env } = new AuthEnviroment();

  return [
    {
      name: 'HERO_PACKAGE',
      transport: Transport.GRPC,
      options: {
        url: env.LEDGER_SERVICE_URI,
        package: 'hero',
        protoPath: path.join(__dirname, '../ledger-service/hero/hero.proto'),
      },
    },
  ];
};

@Module({
  imports: [
    ClientsModule.register(getConfigGRPC()),
    AuthModule, UsersModule],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
