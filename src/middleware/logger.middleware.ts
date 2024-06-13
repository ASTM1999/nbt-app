import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`Request...`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    next();
  }
}
