import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      statusCode: status,
      message: "IP don't allow",
    });
  }
}
