import { ErrorDocumentation } from './_error.documentation';
import { BaseError } from './base.error';

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
