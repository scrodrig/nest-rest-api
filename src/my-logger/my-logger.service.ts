import * as fs from 'fs';
import * as path from 'path';

import { ConsoleLogger, Injectable } from '@nestjs/common';

import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.txt'),
        formattedEntry,
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, message);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
