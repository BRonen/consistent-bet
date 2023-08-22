import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions.filter';
import { Enviroment } from '@consistent-bets/config';

async function bootstrap() {
  const { env } = new Enviroment();
  
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(env.PORT);
}

bootstrap();
