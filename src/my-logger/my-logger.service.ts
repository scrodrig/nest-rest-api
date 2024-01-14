import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    super.log(message, message);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${context}\t${message}`;
    super.error(message, stackOrContext);
  }
}
