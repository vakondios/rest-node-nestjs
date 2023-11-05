import { ErrorDocumentation } from './_error.documentation';
import { BaseError } from './base.error';

export class BadRequestError extends BaseError {
  constructor(className: string, functionName: string) {
    super(
      ErrorDocumentation.moreFieldsFromEntity.errorId,
      ErrorDocumentation.moreFieldsFromEntity.statusCode,
      ErrorDocumentation.moreFieldsFromEntity.httpResposeMessage,
      className,
      functionName,
      ErrorDocumentation.moreFieldsFromEntity.errorMessage ? ErrorDocumentation.moreFieldsFromEntity.errorMessage : ''
    );
  }
}
