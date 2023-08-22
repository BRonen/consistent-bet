import { NestFactory } from '@nestjs/core';
import { PaymentsWorkerModule } from './payments-worker.module';
import { Enviroment } from '@consistent-bets/config';

async function bootstrap() {
  const { env } = new Enviroment();
  const app = await NestFactory.create(PaymentsWorkerModule);

  await app.listen(env.PORT + 1);
}
bootstrap();
