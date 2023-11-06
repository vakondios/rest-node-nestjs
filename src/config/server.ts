import { registerAs } from '@nestjs/config';

export default registerAs('srv', () => ({
  port: process.env.SERVER_PORT || 3000,
  network: process.env.SERVER_NETWORK || '127.0.0.1',
  applyEncryption: process.env.SERVER_ENCRYPTION || 0,
}));
