import { ClsServiceManager } from 'nestjs-cls';

export abstract class BaseError extends Error {
  public readonly timestamp: Date;
  public readonly transactionId: string;

  constructor(
    public readonly errorId: number,
    public readonly statusCode: number,
    public readonly httpMessage: string,
    public readonly className: string,
    public readonly functionName: string,
    public readonly errorMessage: string
  ) {
    super(errorMessage);
    //Object.setPrototypeOf(this, BaseError.prototype); //Εάν γίνει, τότε το instanceof θα δίνει για την BaseError.
    this.timestamp = new Date();
    this.transactionId = ClsServiceManager.getClsService().get('transId');
  }
}
