import { CurrentUser } from '@app/core/base/decorator/current.user.decorator';
import { AuthGuard } from '@app/core/base/guard/auth.guard';
import { LocalAuthGuard } from '@app/core/base/guard/local.auth.guard';
import { ResponseSerialize } from '@app/core/base/interceptor/response.serialize.interceptor';
import { IBaseController } from '@app/core/base/interface/base.controller.interface';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { LogMethod } from '@app/core/base/util/log.utils';
import { Body, Controller, Get, Logger, Post, Session, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@app/shared/auth/auth.service';
import { SignInAuthRequestDto, SignUpAuthRequestDto } from '@app/shared/auth/dto/auth.request.dto';
import { SignInAuthResponseDto, SignUpAuthResponseDto } from '@app/shared/auth/dto/auth.response.dto';
import { UserResponseDto } from '@app/shared/user/dto/user.response.dto';
import { UserEntity } from '@app/shared/user/user.entity';

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
    session.destroy();
    return {};
  }

  @ResponseSerialize(SignInAuthResponseDto)
  @Post('/signin')
  @LogMethod()
  async signin(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    signinAuthRequestDto: SignInAuthRequestDto,
    @Session() session: any
  ): Promise<IBaseEntity> {
    const user = await this.authService.validateUser(signinAuthRequestDto);
    session.userId = user.id;
    return user;
  }

  @ResponseSerialize(SignUpAuthResponseDto)
  @UseGuards(LocalAuthGuard)
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
