import { registerAs } from '@nestjs/config';

export default registerAs('log', () => ({
  logfile: process.env.LOG_LOGFILE  ||' ./logs/application.log',
  maxSize: process.env.LOG_MAXSIZE || '20m',
  maxFiles: process.env.LOG_MAXFILES || '1d',
  logLevel: process.env.LOG_LEVEL || 'info',
  viewJson: process.env.LOG_VIEWJSON || 'false',
  printConsole: process.env.LOG_PRINTCONSOLE || 'true',
  printFile: process.env.LOG_PRINTFILE || 'true'
}));
