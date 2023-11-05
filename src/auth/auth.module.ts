import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { MetricModule } from '../metric/metric.module';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, MetricModule, ClsModule],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
