import config from '@app/config/index';
import { UserModule } from '@app/shared/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/shared/auth/auth.module';
import { MetricModule } from '@app/shared/metric/metric.module';
import { ClsModule } from 'nestjs-cls';
import { getConfigMySqlDb, getConfigPostgresDb, getConfigSqliteDb } from '@app/core/db/typeorm.config.db';
import { ReportsModule } from '@app/feature/report/report.module';

import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const getGlobalImport = [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`,
      expandVariables: true,
      load: config,
    }),
    ClsModule.forRoot({
      middleware: { mount: true },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        switch (process.env.NODE_ENV) {
          case 'development': {
            return getConfigPostgresDb(config);
          }
          case 'test': {
            return getConfigSqliteDb(config);
          }
          case 'production': {
            return getConfigMySqlDb(config);
          }
        }
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        // other transports...
      ],
      // other options
    }),
    MetricModule,
    UserModule,
    ReportsModule, 
    AuthModule,
    ReportsModule,
  ]