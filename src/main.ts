import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


const port = process.env.PORT || 3000;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  console.log('DATABASE_URL:', configService.get<string>('DATABASE_URL'));
  console.log('ENCRYPTION_KEY:', configService.get<string>('ENCRYPTION_KEY'));
  
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://toolkithub282.web.app'
    ],
    // credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });
  await app.listen(port, "0.0.0.0");
}
bootstrap();
