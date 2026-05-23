import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// Controller
import { AppController } from './app.controller';

// Service
import { AppService } from './app.service';

// Modules
import { UserModule } from './user/user.module';

// Middleware
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes("*")
  }
}
