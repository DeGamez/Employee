import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder().setTitle('Employee API').setDescription('An API about Employees and their tasks, and departments').setVersion('1.0').build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
