import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

export class EmailOrPasswordIsWrong extends BaseError {
  constructor(className: string, functionName: string) {
    super(
      ErrorDocumentation.emailOrPasswordIsWrong.errorId,
      ErrorDocumentation.emailOrPasswordIsWrong.statusCode,
      ErrorDocumentation.emailOrPasswordIsWrong.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.emailOrPasswordIsWrong.errorMessage
        ? ErrorDocumentation.emailOrPasswordIsWrong.errorMessage
        : ErrorDocumentation.emailOrPasswordIsWrong.httpResposeMessage
    );
  }
}
