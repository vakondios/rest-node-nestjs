import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getConfigPostgresDb(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    database: config.get('db.database'),
    host: config.get('db.host'),
    port: parseInt(config.get('db.port')),
    username: config.get('db.username'),
    password: config.get('db.password'),
    url: config.get('db.url'),
    //entities: [UserEntity, ReportEntity],
    entities: ['dist/**/*.entity.js'],
    synchronize: config.get('db.isSync') === 'true',
    dropSchema: config.get('db.isDropSchema') === 'true',
    cache: config.get('db.isCache') === 'true',
    logging: config.get('db.isLogging') === 'true',
    migrationsTableName: '_migrations',
    migrations: ['dist/db/migrations/*.js'],
    migrationsRun: config.get('db.isRunMigration') === 'true',
    poolSize: parseInt(config.get('db.pool')),
  };
}

export function getConfigMySqlDb(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    database: config.get('db.database'),
    host: config.get('db.host'),
    port: parseInt(config.get('db.port')),
    username: config.get('db.username'),
    password: config.get('db.password'),
    //entities: [UserEntity, ReportEntity],
    entities: ['dist/**/*.entity.js'],
    synchronize: config.get('db.isSync') === 'true',
    dropSchema: config.get('db.isDropSchema') === 'true',
    cache: config.get('db.isCache') === 'true',
    logging: config.get('db.isLogging') === 'true',
    migrationsTableName: '_migrations',
    migrations: ['dist/db/migrations/*.js'],
    migrationsRun: config.get('db.isRunMigration') === 'true',
  };
}

export function getConfigSqliteDb(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: config.get('db.database'),
    //entities: [UserEntity, ReportEntity],
    entities: ['dist/**/*.entity.js'],
    synchronize: config.get('db.isSync') === 'true',
    dropSchema: config.get('db.isDropSchema') === 'true',
    logging: config.get('db.isLogging') === 'true',
    migrationsTableName: '_migrations',
    migrations: ['dist/db/migrations/*.js'],
    migrationsRun: config.get('db.isRunMigration') === 'true',
  };
}
