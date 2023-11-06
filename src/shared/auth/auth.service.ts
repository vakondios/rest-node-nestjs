import { randomBytes, scrypt as _scrtpt } from 'crypto';
import { promisify } from 'util';

import { EmailOrPasswordIsWrong } from '@app/core/base/error/email.or.password.wrong.error';
import { UniqueFieldExitsError } from '@app/core/base/error/unique.field.exists.error';
import { BaseService } from '@app/core/base/service/base.service';
import { LogMethod } from '@app/core/base/util/log.utils';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '@app/shared/user/user.entity';
import { UserService } from '@app/shared/user/user.service';

import { SignInAuthRequestDto, SignUpAuthRequestDto } from './dto/auth.request.dto';

const scrypt = promisify(_scrtpt); //translate the callbacks to promises

@Injectable()
export class AuthService extends BaseService {
  constructor(private readonly userService: UserService) {
    super(AuthService.name);
    Logger.log('New Instance of class', AuthService.name);
  }

  @LogMethod()
  async whoAmI(userId: string) {
    return this.userService.findOneById(userId);
  }

  @LogMethod()
  async validateUser(signInAuthRequestDto: SignInAuthRequestDto): Promise<UserEntity> {
    //Check if the username exists
    signInAuthRequestDto.username = signInAuthRequestDto.username.toLowerCase();
    const ret = await this.userService.searchEqual(['username'], signInAuthRequestDto.username);
    if (ret.totalRecords !== 1) {
      throw new EmailOrPasswordIsWrong(UserService.name, 'signin');
    }
    //Get user
    const user = ret.data[0];
    //Get salt and storad hash
    const [salt, storedHash] = user.password.split('.');
    //Create the new salt and compared
    const hash = (await scrypt(signInAuthRequestDto.password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new EmailOrPasswordIsWrong(UserService.name, 'signin');
    }

    return user;
  }

  @LogMethod()
  async signup(signUpAuthRequestDto: SignUpAuthRequestDto) {
    // Check if the username is in use
    signUpAuthRequestDto.username = signUpAuthRequestDto.username.toLowerCase();
    const ret = await this.userService.checkIfUserAlreadyExistsByUsername(signUpAuthRequestDto.username);
    if (ret) {
      throw new UniqueFieldExitsError(UserService.name, 'signup', signUpAuthRequestDto.username);
    }
    //Generate a salt
    const salt = randomBytes(8).toString('hex');
    //Hash rhe salt and the password together
    const hash = (await scrypt(signUpAuthRequestDto.password, salt, 32)) as Buffer;
    //Join the hashed result and the salt together
    signUpAuthRequestDto.password = salt + '.' + hash.toString('hex');
    //Create a new user and save it
    return await this.userService.create(signUpAuthRequestDto, null);
  }
}
