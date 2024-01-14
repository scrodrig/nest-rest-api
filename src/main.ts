import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.useLogger(app.get(MyLoggerService));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
