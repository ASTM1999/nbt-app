import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://toolkithub282.web.app'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });
  await app.listen(port, "0.0.0.0");
}
bootstrap();
