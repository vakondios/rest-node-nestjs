import { ErrorDocumentation } from './_error.documentation';
import { BaseError } from './base.error';

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
