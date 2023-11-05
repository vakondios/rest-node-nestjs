import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**.
 * @returns the the User Object (if exists) from the session module of the Request controller.
 */
export const CurrentUser = createParamDecorator((data: never, content: ExecutionContext) => {
  const req = content.switchToHttp().getRequest();
  return req.currentUser;
});
