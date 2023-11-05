import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ReportEntity } from '../../reports/report.entity';
import { UserEntity } from '../../user/user.entity';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getCookieKey() {
    return this.getValue('COOKIE_KEY', true);
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'PROD';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const conf_Postgres: TypeOrmModuleOptions = {
      type: 'postgres',
      database: this.getValue('TYPEORM_DATABASE', true),
      host: this.getValue('TYPEORM_HOST', true),
      port: parseInt(this.getValue('TYPEORM_PORT', true)),
      username: this.getValue('TYPEORM_USER', true),
      password: this.getValue('TYPEORM_PASSWORD', true),
      url: this.getValue('TYPEORM_URL', true),
      entities: [UserEntity, ReportEntity],
      //entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
      synchronize: this.getValue('TYPEORM_SYNC', true) === 'true',
      dropSchema: this.getValue('TYPEORM_DROP_SCHEMA', true) === 'true',
      cache: this.getValue('TYPEORM_CACHE', true) === 'true',
      logging: this.getValue('TYPEORM_LOGGING', true) === 'true',
      migrationsTableName: '_migrations',
      migrations: ['/migrations/*{.ts,.js}'],
      migrationsRun: this.getValue('TYPEORM_MIGRATIONS_RUN', true) === 'true',
      poolSize: parseInt(this.getValue('TYPEORM_CONNECTION_POOL_SIZE', true)),
    };

    const conf_MySql: TypeOrmModuleOptions = {
      type: 'mysql',
      database: this.getValue('TYPEORM_DATABASE', true),
      host: this.getValue('TYPEORM_HOST', true),
      port: parseInt(this.getValue('TYPEORM_PORT', true)),
      username: this.getValue('TYPEORM_USER', true),
      password: this.getValue('TYPEORM_PASSWORD', true),
      url: this.getValue('TYPEORM_URL'),
      entities: [UserEntity, ReportEntity],
      //entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
      synchronize: this.getValue('TYPEORM_SYNC', true) === 'true',
      dropSchema: this.getValue('TYPEORM_DROP_SCHEMA', true) === 'true',
      cache: this.getValue('TYPEORM_CACHE', true) === 'true',
      logging: this.getValue('TYPEORM_LOGGING', true) === 'true',
      migrationsTableName: '_migrations',
      migrations: ['/migrations/*{.ts,.js}'],
      migrationsRun: this.getValue('TYPEORM_MIGRATIONS_RUN', true) === 'true',
      extra: { connectionLimit: parseInt(this.getValue('TYPEORM_CONNECTION_POOL_SIZE', true)) },
    };

    const conf_DbSqlite: TypeOrmModuleOptions = {
      type: 'sqlite',
      database: this.getValue('TYPEORM_DATABASE', true),
      entities: [UserEntity, ReportEntity],
      //entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
      synchronize: this.getValue('TYPEORM_SYNC', true) === 'true',
      dropSchema: this.getValue('TYPEORM_DROP_SCHEMA', true) === 'true',
      cache: this.getValue('TYPEORM_CACHE', true) === 'true',
      logging: this.getValue('TYPEORM_LOGGING', true) === 'true',
      migrationsTableName: '_migrations',
      migrations: ['/migrations/*{.ts,.js}'],
      migrationsRun: this.getValue('TYPEORM_MIGRATIONS_RUN', true) === 'true',
    };

    Logger.log('************************************************************');
    Logger.log(`Configuration for MODE ${this.getValue('MODE')} \n`, ConfigService.name);
    Logger.log('************************************************************');

    //Validates that all field have values
    this.ensureValues([
      'TYPEORM_DATABASE',
      'TYPEORM_HOST',
      'TYPEORM_PORT',
      'TYPEORM_USER',
      'TYPEORM_PASSWORD',
      'TYPEORM_SYNC',
      'TYPEORM_URL',
      'TYPEORM_CONNECTION_POOL_SIZE',
      'TYPEORM_CACHE',
      'TYPEORM_LOGGING',
      'TYPEORM_MIGRATIONS_RUN',
      'TYPEORM_DROP_SCHEMA',
      'COMPOSE_PROJECT_NAME',
      'MODE',
      'SERVER_PORT',
      'JWT_SECRET_KEY',
      'JWT_EXPIRATION',
      'COOKIE_KEY',
    ]);

    return this.getValue('MODE', true) === 'DEV'
      ? conf_Postgres: this.getValue('MODE', true) === 'TEST'
      ? conf_DbSqlite: conf_MySql;
  }
}

const configService = new ConfigService(process.env);

export { configService };
