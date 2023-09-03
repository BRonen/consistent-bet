import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { AuthEnviroment } from './auth-environment';

async function bootstrap() {
  const { env } = new AuthEnviroment();

  const app = await NestFactory.create(AuthServiceModule);

  await app.listen(env.PORT);
}
bootstrap();
