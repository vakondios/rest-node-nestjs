// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { UserEntity } from '@app/shared/user/user.entity';
// import { Strategy } from 'passport-local';

// import { AuthService } from './auth.service';
// import { SignInAuthRequestDto } from './dto/auth.request.dto';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(signInAuthRequestDto: SignInAuthRequestDto): Promise<UserEntity> {
//     const user = await this.authService.validateUser(signInAuthRequestDto);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
