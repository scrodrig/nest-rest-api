import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponseObject = {
  statusCode: number;
  response: string | object;
  timestamp: string;
  path: string;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObject: MyResponseObject = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObject.statusCode = exception.getStatus();
      myResponseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObject.statusCode = HttpStatus.BAD_REQUEST;
      myResponseObject.response = exception.message.replaceAll(/\n/g, '');
    } else {
      myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObject.response = 'Internal Server Error';
    }

    response.status(myResponseObject.statusCode).json(myResponseObject);
    this.logger.error(myResponseObject.response, AllExceptionsFilter.name);
    super.catch(exception, host);
  }
}
