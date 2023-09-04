import { Module } from '@nestjs/common';
import {
  ClientsModule,
  ClientsModuleOptions,
  Transport,
} from '@nestjs/microservices';
import path from 'path';

import { AuthServiceController } from './auth-service.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthEnviroment } from './auth-environment';

const getConfigClients = (): ClientsModuleOptions => {
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
    {
      name: 'MATH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://events-mq:5672'],
        queue: 'cats_queue',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    },
  ];
};

@Module({
  imports: [
    ClientsModule.register(getConfigClients()),
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthServiceController],
})
export class AuthServiceModule {}
