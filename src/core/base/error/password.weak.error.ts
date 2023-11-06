import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

export class PasswordWeakError extends BaseError {
  constructor(className: string, functionName: string) {
    super(
      ErrorDocumentation.passwordWeakError.errorId,
      ErrorDocumentation.passwordWeakError.statusCode,
      ErrorDocumentation.passwordWeakError.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.passwordWeakError.errorMessage
        ? ErrorDocumentation.passwordWeakError.errorMessage
        : ErrorDocumentation.passwordWeakError.httpResposeMessage
    );
  }
}
