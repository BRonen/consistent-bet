import { NestFactory } from '@nestjs/core';
import { TransactionsWorkerModule } from './payments-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsWorkerModule);
  await app.listen(3000);
}
bootstrap();
