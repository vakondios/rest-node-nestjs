import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricModule } from '@app/shared/metric/metric.module';
import { UserController } from '@app/shared/user/user.controller';
import { UserEntity } from '@app/shared/user/user.entity';
import { UserService } from '@app/shared/user/user.service';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MetricModule, ClsModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
