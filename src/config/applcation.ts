import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'rest_api',
  version: process.env.APP_VERSION || '0.0.1',
  env: process.env.APP_ENV || 'DEVELOPMENT',
}));
