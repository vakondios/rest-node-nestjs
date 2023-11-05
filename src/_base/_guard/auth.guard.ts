import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

import { LogMethod3 } from '../_decorator/log.decorator';

/**
 * Only if the request has session, it is continue to next level, otherwise 'Forbidden-403'
 */
export class AuthGuard implements CanActivate {
  constructor() {
    Logger.log('New Instance of class', AuthGuard.name);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    LogMethod3('Has Session', 'Guard', AuthGuard.name, 'canActivate', req.transactionId);
    const ret = req.session.userId;

    return ret;
  }
}
