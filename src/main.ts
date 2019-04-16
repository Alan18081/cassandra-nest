import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {ConfigService} from './components/core/services/config.service';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
      .setTitle('Cassandra-Nest')
      .setDescription('The simple API to demonstrate Cassandra and Nestjs integration')
      .setVersion('1.0')
      .addTag('cassandra')
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(+configService.get('PORT'));
}
bootstrap();
