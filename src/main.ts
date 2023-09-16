import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  BigInt.prototype['toJSON'] = function () {
    if (this > Number.MAX_SAFE_INTEGER || this < Number.MIN_SAFE_INTEGER) {
      return this.toString();
    } else {
      return Number(this);
    }
  };

  await app.listen(config.get('PORT') || 3333);
}
bootstrap();
