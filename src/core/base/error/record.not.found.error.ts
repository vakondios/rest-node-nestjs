import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

export class RecordNotFoundError extends BaseError {
  constructor(className: string, functionName: string, entityId: number) {
    super(
      ErrorDocumentation.recordNotFoundError.errorId,
      ErrorDocumentation.recordNotFoundError.statusCode,
      ErrorDocumentation.recordNotFoundError.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.recordNotFoundError.errorMessage
        ? ErrorDocumentation.recordNotFoundError.errorMessage
        : className + ' record not found with id ' + entityId
    );
  }
}
