/*
DO NOT have public VALIDATIONS or TRANSFORMATION. APPLY Directly to Controllers
*/

import { Body, Controller, Param, ParseIntPipe, Patch, Post, ValidationPipe, UseGuards } from '@nestjs/common';

import { BaseController } from '../_base/_controller/base.controller';
import { CurrentUser } from '../_base/_decorator/current.user.decorator';
import { LogMethod } from '../_base/_decorator/log.decorator';
import { AuthGuard } from '../_base/_guard/auth.guard';
import { ResponseSerialize } from '../_base/_interceptor/response.serialize.interceptor';
import { IBaseEntity } from '../_base/_interface/base.entity.interface';

import { CreateUserRequestControllerDto, UpdateUserRequestControllerDto } from './dto/user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

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
