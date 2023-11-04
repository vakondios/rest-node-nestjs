import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { MetricModule } from '../metric/metric.module';

@Module({
  imports: [UserModule, MetricModule, ClsModule],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService] 
})
export class AuthModule {}
