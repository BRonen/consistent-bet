import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error({
      method: request.method,
      host: request.hostname,
      path: request.path,
      ip: request.ip,
      message: exception.message,
      statusCode: status,
      stacktrace: exception.stack,
      timestamp: new Date().toISOString(),
    });

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
      return response.status(500).json({
        status,
        message: 'Unexpected error has occurred',
      });

    response.status(status).json({
      status,
      message: exception.message,
    });
  }
}
