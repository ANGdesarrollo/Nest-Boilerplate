import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';

void (async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  await app.register(fastifyCookie, {
    secret: configService.get('NODE_COOKIE_SECRET'),
    parseOptions: {
      secure: configService.get('NODE_ENV') === 'PRODUCTION',
      signed: true,
      httpOnly: true,
      maxAge: configService.get('NODE_COOKIE_EXPIRES_IN'),
      path: '/',
    },
  });

  await app.listen(8080);
})();
