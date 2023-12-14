import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Faz que o class-validator utilize do mesmo mecanismo de injecao de resolucao/dependencias que o NestJs.
  useContainer(
    app.select(AppModule),
    { fallbackOnErrors: true }, // caso ocorra um erro, utilizara o mecanismo padrao.
  );
  await app.listen(3030);
}
bootstrap();
