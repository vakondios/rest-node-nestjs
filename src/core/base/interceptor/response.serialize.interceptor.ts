import { IBaseClassConstructor } from '@app/core/base/interface/base.class.constructor.interface';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogMethod2 } from '@app/core/base/util/log.utils';

import { PageDto } from '@app/core/base/dto/page.dto';

//Decorator, so to be more minimal
export function ResponseSerialize(dto: IBaseClassConstructor) {
  return UseInterceptors(new ResponseSerializeInterceptor(dto));
}

@Injectable()
export class ResponseSerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {
    Logger.log(`New Instance of class for ${dto}`, ResponseSerializeInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data) {
          let retObj: any;

          if (data instanceof PageDto) {
            retObj = { data: plainToClass(this.dto, data.data, { excludeExtraneousValues: true }), meta: data.meta };
          } else {
            retObj = plainToClass(this.dto, data, { excludeExtraneousValues: true });
          }

          LogMethod2(
            'Serialize Response',
            'Interceptor',
            ResponseSerializeInterceptor.name,
            'intercept',
            { Before_body: data },
            { after_body: retObj }
          );

          return retObj;
        }
      })
    );
  }
}
