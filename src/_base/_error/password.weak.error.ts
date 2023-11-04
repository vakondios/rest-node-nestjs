import { BaseError } from "./base.error";
import { ErrorDocumentation } from "./_error.documentation"


export class PasswordWeakError extends BaseError {
  
    constructor(
      className: string, functionName: string) {
      super(
        ErrorDocumentation.passwordWeakError.errorId,
        ErrorDocumentation.passwordWeakError.statusCode,
        ErrorDocumentation.passwordWeakError.httpResposeMessage,
        className, 
        functionName, 
        ErrorDocumentation.passwordWeakError.errorMessage? 
            ErrorDocumentation.passwordWeakError.errorMessage :
            ErrorDocumentation.passwordWeakError.httpResposeMessage
      );
    }
  }