import { LogMethod3 } from '@app/core/base/util/log.utils';
import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';

/**
 * Only if the request has session, it is continue to next level, otherwise 'Forbidden-403'
 */
export class AuthGuard implements CanActivate {
  constructor() {
    Logger.log('New Instance of class', AuthGuard.name);
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    LogMethod3('Has Login', 'Guard', AuthGuard.name, 'canActivate', req.transactionId);
    const ret = req.isAuthenticated();

    return ret;
  }
}
