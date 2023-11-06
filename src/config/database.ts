import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  database: process.env.DB_DATABASE || 'app',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  url: process.env.DB_URL || 'postgres://admin:admin@localhost:5432/vcrm',
  pool: process.env.DB_CONNECTION_POOL_SIZE || '5',
  isSync: process.env.DB_SYNC || false,
  isCache: process.env.DB_CACHE || false,
  isLogging: process.env.DB_LOGGING || false,
  isRunMigration: process.env.DB_MIGRATIONS_RUN || false,
  isDropSchema: process.env.DB_DROP_SCHEMA || false,
}));
