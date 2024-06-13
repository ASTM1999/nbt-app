import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpGuard implements CanActivate {
  private readonly allowedIps: string[] = [process.env.PUBLIC_IP];

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const clientIp = request.ip;

    if (!this.allowedIps.includes(clientIp)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
