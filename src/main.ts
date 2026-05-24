import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  console.log('Application is running on port 3000');
  console.log("http://localhost:3000");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
