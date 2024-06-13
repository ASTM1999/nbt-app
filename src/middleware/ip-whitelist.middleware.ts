import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  private readonly whitelistedIps: string[];

  constructor() {
    const allowedIps = process.env.ALLOWED_IP_ADDRESSES?.split(',');
    console.log("allowIps", allowedIps);
    console.log("process.env.allow_ip_address", process.env.ALLOWED_IP_ADDRESSES);
    if (allowedIps) {
      this.whitelistedIps = allowedIps;
    } else {
      console.error('Failed to retrieve allowed IP addresses from environment variable.');
      this.whitelistedIps = [];
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    console.log("clientIp", clientIp);

    if (Array.isArray(clientIp) ? clientIp.some(ip => this.whitelistedIps.includes(ip)) : this.whitelistedIps.includes(clientIp)) {
      return true;
    } else {
      throw new UnauthorizedException('IP not allowed');
    }
  }
}
