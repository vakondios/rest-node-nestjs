import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { appConfig, databaseConfig, authConfig, emailConfig } from 'src/config';
import { UserEntity } from '../../user/user.entity';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        //entities: ['dist/**/*.entity{.ts,.js}'],
        entities: [UserEntity],
        migrationsRun: false,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class TestDatabaseModule {}
