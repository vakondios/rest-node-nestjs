import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MetricModule } from '../metric/metric.module';
import { ClsModule } from 'nestjs-cls';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MetricModule, ClsModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService] 
})
export class UserModule {}
