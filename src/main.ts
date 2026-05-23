import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Application is running on port 3000');
  console.log('Press CTRL+C to stop the application');
  console.log("http://localhost:3000");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
