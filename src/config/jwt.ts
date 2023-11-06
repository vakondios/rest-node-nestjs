import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.JWT_SECRET_KEY || 'secretKey123456',
  expiration: process.env.JWT_EXPIRATION || 3600,
}));
