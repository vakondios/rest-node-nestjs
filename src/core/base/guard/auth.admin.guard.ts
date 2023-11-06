import { LogMethod3 } from '@app/core/base/util/log.utils';
import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Only if the request has executed from Admin User, it is continue to next level, otherwise 'Forbidden-403'
 */
export class AuthAdminGuard implements CanActivate {
  constructor() {
    Logger.log('New Instance of class', AuthAdminGuard.name);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    LogMethod3('Is Admin', 'Guard', AuthAdminGuard.name, 'canActivate', req.transactionId);

    if (!req.currentUser) {
      return false;
    }

    return req.currentUser.isAdmin;
  }
}
