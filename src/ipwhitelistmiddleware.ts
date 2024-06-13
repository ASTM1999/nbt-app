import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
  private readonly whitelistedIps: string[] = process.env.ALLOWED_IP_ADDRESSES?.split(',') || [];

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.socket.remoteAddress;

    if (this.whitelistedIps.includes(clientIp)) {
      next();
    } else {
      throw new UnauthorizedException('IP not allowed');
    }
  }
}
