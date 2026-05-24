import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const duration = Date.now() - now;
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        console.log({ method, url, duration });
        return {
          data,
          meta: {
            method,
            url,
            duration,
          },
        };
      }),
    );
  }
}
