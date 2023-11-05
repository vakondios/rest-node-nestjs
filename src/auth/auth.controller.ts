import { Body, Controller, Get, Logger, Post, Session, UseGuards, ValidationPipe } from '@nestjs/common';

import { CurrentUser } from '../_base/_decorator/current.user.decorator';
import { LogMethod } from '../_base/_decorator/log.decorator';
import { AuthGuard } from '../_base/_guard/auth.guard';
import { ResponseSerialize } from '../_base/_interceptor/response.serialize.interceptor';
import { IBaseController } from '../_base/_interface/base.controller.interface';
import { IBaseEntity } from '../_base/_interface/base.entity.interface';
import { UserResponseDto } from '../user/dto/user.response.dto';
import { UserEntity } from '../user/user.entity';

import { AuthService } from './auth.service';
import { SignInAuthRequestDto, SignUpAuthRequestDto } from './dto/auth.request.dto';
import { SignInAuthResponseDto, SignUpAuthResponseDto } from './dto/auth.response.dto';

@Controller('/auth')
export class AuthController implements IBaseController {
  constructor(private readonly authService: AuthService) {
    Logger.log('New Instance of class', AuthController.name);
  }

  @ResponseSerialize(UserResponseDto)
  @UseGuards(AuthGuard)
  @Get('/whoami')
  @LogMethod()
  async whoAmI(@CurrentUser() user: UserEntity) {
    return user;
  }

  @ResponseSerialize(UserResponseDto)
  @Post('/signout')
  @LogMethod()
  async signOut(@Session() session: any) {
    session.userId = null;
    return null;
  }

  @ResponseSerialize(SignInAuthResponseDto)
  @Post('/signin')
  @LogMethod()
  async signin(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    signinAuthRequestDto: SignInAuthRequestDto,
    @Session() session: any
  ): Promise<IBaseEntity> {
    const user = await this.authService.signin(signinAuthRequestDto);
    session.userId = user.id;
    return user;
  }

  @ResponseSerialize(SignUpAuthResponseDto)
  @Post('/signup')
  @LogMethod()
  async signup(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    signUpAuthRequestDto: SignUpAuthRequestDto,
    @Session() session: any
  ): Promise<IBaseEntity> {
    const user = await this.authService.signup(signUpAuthRequestDto);
    session.userId = user.id;
    return user;
  }
}
