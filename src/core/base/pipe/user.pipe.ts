/*
Custom Pipe (Transformation + Validation)
*/

import { LogMethod2 } from '@app/core/base/util/log.utils';
import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { CreateUserRequestControllerDto } from '@app/shared/user/dto/user.request.dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor() {
    Logger.log('New Instance of class', CreateUserPipe.name);
  }

  transform(body: any, metadata: ArgumentMetadata) {
    LogMethod2('Create User Transform Before', 'PipeTransform', CreateUserPipe.name, 'transform', body, metadata);

    // Tranformation
    const result = new CreateUserRequestControllerDto();
    result.email = body.EMAIL;

    LogMethod2('Create User Transform After', 'PipeTransform', CreateUserPipe.name, 'transform', result, metadata);

    return result;
  }
}
