import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LedgerServiceModule } from './ledger-service.module';
import { LedgerEnviroment } from './ledger-environment';
import path from 'path';

async function bootstrap() {
  const { env } = new LedgerEnviroment();

  const app = await NestFactory.create(LedgerServiceModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:9090',
      package: 'hero',
      protoPath: path.join(__dirname, './hero/hero.proto'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(env.PORT);
}
bootstrap();
