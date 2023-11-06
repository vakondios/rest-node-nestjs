export class ErrorDocumentation {
  static badRequestException = {
    errorId: 100,
    statusCode: 400,
    httpResposeMessage: 'Bad Request: ',
    errorMessage: null,
  };
  static validationError = {
    errorId: 100,
    statusCode: 400,
    httpResposeMessage: 'Validation error: ',
    errorMessage: null,
  };
  static passwordWeakError = {
    errorId: 101,
    statusCode: 403,
    httpResposeMessage: 'Password is weak',
    errorMessage: null,
  };
  static uniqueFieldExitsError = {
    errorId: 102,
    statusCode: 404,
    httpResposeMessage: 'Value exists',
    errorMessage: null,
  };
  static moreFieldsFromEntity = {
    errorId: 103,
    statusCode: 404,
    httpResposeMessage: 'Bad request',
    errorMessage: 'there is/are more fields in the DTO',
  };
  static genericTypeOrmError = {
    errorId: 103,
    statusCode: 404,
    httpResposeMessage: 'Internal Error',
    errorMessage: null,
  };
  static recordNotFoundError = {
    errorId: 103,
    statusCode: 404,
    httpResposeMessage: 'Record Not Found',
    errorMessage: null,
  };
  static emailOrPasswordIsWrong = {
    errorId: 104,
    statusCode: 400,
    httpResposeMessage: 'Email or Password are wrong',
    errorMessage: null,
  };
}
