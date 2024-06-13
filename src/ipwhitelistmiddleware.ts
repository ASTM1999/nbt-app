import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const allowedIps = this.configService.get<string>('ALLOWED_IP_ADDRESSES').split(',');

    const requestIp = req.ip || req.connection.remoteAddress;

    if (allowedIps.includes(requestIp)) {
      next();
    } else {
      throw new UnauthorizedException('Your IP address is not authorized to access this resource');
    }
  }
}
