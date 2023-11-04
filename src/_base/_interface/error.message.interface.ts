export interface LogError {
    errorId: string;
    className: string;
    functionName: string;
    errorMessage: string;
    timestamp: Date;
    transactionId: string;
    path: string;
    route: string;
    method: string;
  };

  export interface ApiError {
    statusCode: number;
    message: string;
    errorId: string;
    timestamp: Date;
    transactionId: string;
    route: string;
    method: string;
  }