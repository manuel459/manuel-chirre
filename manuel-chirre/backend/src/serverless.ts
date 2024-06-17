import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@codegenie/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { EventService } from './application/services/event.service';
let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: false});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp});
}

export const handler: Handler = async ( event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};


export const createPedidoCron = async (event) => {
  const context = await NestFactory.create(AppModule, {logger: false })
  const service = context.get(EventService);
  service.createPedidoCron(event);
}