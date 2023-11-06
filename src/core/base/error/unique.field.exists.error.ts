import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

export class UniqueFieldExitsError extends BaseError {
  constructor(className: string, functionName: string, value: string) {
    super(
      ErrorDocumentation.uniqueFieldExitsError.errorId,
      ErrorDocumentation.uniqueFieldExitsError.statusCode,
      ErrorDocumentation.uniqueFieldExitsError.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.uniqueFieldExitsError.errorMessage
        ? ErrorDocumentation.uniqueFieldExitsError.errorMessage
        : ' Value exists on the table with value ' + value
    );
  }
}
