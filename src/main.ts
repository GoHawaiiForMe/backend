import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';
import GlobalExceptionFilter from './common/filters/globalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (
      origin: boolean | string | RegExp | (string | RegExp)[],
      callback: (error: null, allow: boolean) => void
    ) => {
      callback(null, true);
    },
    credentials: true
  });
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());

  // swagger 세부 세팅 참고 : https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('니가 가라 하와이 API')
    .setDescription('여행 중개 플랫폼 [니가 가라 하와이]의 API 명세입니다.')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${process.env.PORT}`)
    .addServer('https://go-for-me.onrender.com')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT Token을 입력하세요',
        in: 'header'
      },
      'accessToken'
    )
    .addCookieAuth('refreshToken')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
