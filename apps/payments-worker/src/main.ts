import { NestFactory } from '@nestjs/core';
import { PaymentsWorkerModule } from './payments-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsWorkerModule);
  await app.listen(3002);
}
bootstrap();
