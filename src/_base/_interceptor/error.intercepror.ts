
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, Logger, BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Request } from 'express';
import { ClsServiceManager } from 'nestjs-cls';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { METRIC_TYPE_ENUM } from '../../metric/metric.type.enum';
import { GenericTypeOrmError } from '../_error/generic.typeorm.error';
import { RecordNotFoundError } from '../_error/record.not.found.error';
import { ApiError, LogError } from '../_interface/error.message.interface';
import { MetricService } from '../../metric/metric.service';
import { LogMethod2 } from '../_decorator/log.decorator';
import { UniqueFieldExitsError } from '../_error/unique.field.exists.error';
import { PasswordWeakError } from '../_error/password.weak.error';
import { ErrorDocumentation } from '../_error/_error.documentation';
import { EmailOrPasswordIsWrong } from '../_error/email.or.password.wrong.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {

    constructor(private readonly metricService: MetricService) 
    {Logger.log('New Instance of class',ErrorInterceptor.name);} 

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

      return next.handle().pipe(
      catchError((err) => {

        LogMethod2('Error Response','Interceptor',ErrorInterceptor.name,'intercept');
        
        const request: Request = context.switchToHttp().getRequest();
        const cls = ClsServiceManager.getClsService();
        let errCheck: any
        try{
          errCheck = err.getResponse();
        } catch(err) {
          //It is an Error otherwise it is an exception
          errCheck = null;
        }
        
        
        //let bodyApi: ApiError;
        let bodyLog: LogError;
        bodyLog = {
          errorId: errCheck?ErrorDocumentation.badRequestException.errorId:(err.errorId || 0),  
          className: errCheck?'':(err.className || err.name), 
          functionName: errCheck?'':(err.functionName || ''),
          errorMessage: errCheck?errCheck.error + ': ' + errCheck.message.toString():(err.errorMessage || err.message), 
          timestamp: errCheck? new Date().toISOString(): (err.timestamp || new Date().toISOString()),
          transactionId: cls.get('transId'),
          path: request.url,
          route: request.path,
          method: request.method
        };

        const bodyApi = {
          statusCode: err.statusCode || err.status || 500,
          message: errCheck?errCheck.error + ': ' + errCheck.message.toString():(err.errorMessage || err.message), 
          errorId: errCheck?ErrorDocumentation.badRequestException.errorId:(err.errorId || 0), 
          timestamp: errCheck? new Date().toISOString(): (err.timestamp || new Date().toISOString()),
          transactionId: cls.get('transId'),
          route: request.path,
          method: request.method 
        };
        EmailOrPasswordIsWrong
        
        if (err instanceof RecordNotFoundError) {
          this.metricService.updateMetrics(METRIC_TYPE_ENUM.APPLICATION)
        }  else if (err instanceof GenericTypeOrmError) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.DATABASE)
        } else if (err instanceof BadRequestException) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.BADREQUEST) 
            //bodyApi.message = err.getResponse.
        } else if (err instanceof PasswordWeakError) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.APPLICATION) 
          } else if (err instanceof UniqueFieldExitsError) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.APPLICATION) 
        } else if (err instanceof RequestTimeoutException) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.TIMEOUT)
        } else if (err instanceof HttpException) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.VALIDATION)
        } else if (err instanceof EmailOrPasswordIsWrong) {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.APPLICATION)
        } else {
            this.metricService.updateMetrics(METRIC_TYPE_ENUM.UNKNOWN)
        }

        Logger.error(err.message + ' / ' + JSON.stringify({bodyLog}),
        cls.get('transId') + '-' + bodyLog.className + this.print(bodyLog.functionName));

        return throwError(
          () =>
            new HttpException(JSON.stringify(bodyApi), err.statusCode || err.status || 500)   
        );
      })
    );
  }

   private print(input: string): string{
    if (input) {
      return ('-' + input) 
    } else {
      return '';
    }
  }
}
 