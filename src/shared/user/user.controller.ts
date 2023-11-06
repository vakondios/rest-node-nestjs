/*
DO NOT have public VALIDATIONS or TRANSFORMATION. APPLY Directly to Controllers
*/

import { BaseController } from '@app/core/base/controller/base.controller';
import { CurrentUser } from '@app/core/base/decorator/current.user.decorator';
import { AuthGuard } from '@app/core/base/guard/auth.guard';
import { ResponseSerialize } from '@app/core/base/interceptor/response.serialize.interceptor';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { LogMethod } from '@app/core/base/util/log.utils';
import { Body, Controller, Param, ParseIntPipe, Patch, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserEntity } from '@app/shared/user/user.entity';
import { UserService } from '@app/shared/user/user.service';

import { CreateUserRequestControllerDto, UpdateUserRequestControllerDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';

@ResponseSerialize(UserResponseDto)
@Controller('/users')
@UseGuards(AuthGuard)
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userServices: UserService) {
    super(userServices);
  }

  @Post()
  @LogMethod()
  async createUser(
    @CurrentUser() UserEntity: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createUserRequestControllerDto: CreateUserRequestControllerDto
  ): Promise<IBaseEntity> {
    return this.userServices.createUser(createUserRequestControllerDto, UserEntity);
  }

  @Patch(':id')
  @LogMethod()
  async updateUser(
    @CurrentUser() UserEntity: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateUserRequestControllerDto: UpdateUserRequestControllerDto
  ): Promise<IBaseEntity> {
    return this.userServices.update(id, updateUserRequestControllerDto, UserEntity);
  }
}
