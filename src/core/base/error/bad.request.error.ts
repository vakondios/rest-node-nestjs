import { ErrorDocumentation } from '@app/core/base/error/_error.documentation';
import { BaseError } from '@app/core/base/error/base.error';

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
