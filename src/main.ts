import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // 스카마에 정의된 class validation을 사용하기위해 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/api_docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  //const document = SwaggerModule.createDocument(app, config);
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
