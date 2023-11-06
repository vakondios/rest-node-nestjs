import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

export class GenericTypeOrmError extends BaseError {
  constructor(className: string, functionName: string, errorMessage: string) {
    super(
      ErrorDocumentation.genericTypeOrmError.errorId,
      ErrorDocumentation.genericTypeOrmError.statusCode,
      ErrorDocumentation.genericTypeOrmError.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.genericTypeOrmError.errorMessage
        ? ErrorDocumentation.genericTypeOrmError.errorMessage
        : errorMessage
    );
  }
}
