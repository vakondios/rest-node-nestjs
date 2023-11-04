import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsServiceManager } from 'nestjs-cls';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const cls = ClsServiceManager.getClsService();
        const isString = <T = any>(str: string | T): str is string => {
            return typeof str === "string";
          };
        let errCheck: any;

 
        errCheck = exception.getResponse()
        if (isString(errCheck)) {
            errCheck = JSON.parse(errCheck);
        }

        response
            .status(status)
            .json({
                statusCode: status,
                errorCode: errCheck.errorId,
                transactionId: cls.get('transId'),
                message: errCheck.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }

    
}