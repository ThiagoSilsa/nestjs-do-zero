import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const data = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || 'unknown';
    console.log({ data, method, url, ip, userAgent });
    next();
  }
}
