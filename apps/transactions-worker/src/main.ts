import { NestFactory } from '@nestjs/core';
import { TransactionsWorkerModule } from './transactions-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsWorkerModule);
  await app.listen(3000);
}
bootstrap();
