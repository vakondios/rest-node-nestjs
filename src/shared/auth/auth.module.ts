import { Module } from '@nestjs/common';
//import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@app/shared/auth/auth.controller';
import { AuthService } from '@app/shared/auth/auth.service';
//import { LocalStrategy } from '@app/shared/auth/local.strategy';
import { MetricModule } from '@app/shared/metric/metric.module';
import { UserModule } from '@app/shared/user/user.module';
import { ClsModule } from 'nestjs-cls';

//import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, MetricModule, ClsModule], //PassportModule.register({ session: true }),
  exports: [],
  controllers: [AuthController],
  providers: [AuthService], //LocalStrategy, SessionSerializer
})
export class AuthModule {}
