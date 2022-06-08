import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.JWTSECRET);
  const config = new DocumentBuilder()
    .setTitle('Tasks Project')
    .setDescription('Tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('tasks status')
    .addTag('tasks type')
    .addTag('users')
    .addTag('roles')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'Token' },
      'accessToken'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(7000);
}
bootstrap();
