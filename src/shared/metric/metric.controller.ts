import { IBaseController } from '@app/core/base/interface/base.controller.interface';
import { Controller, Get, Logger } from '@nestjs/common';
import { MetricService } from '@app/shared/metric/metric.service';
import { METRIC_TYPE_ENUM } from '@app/shared/metric/metric.type.enum';

import { LogMethod } from '@app/core/base/util/log.utils';

@Controller('/health')
export class MetricController implements IBaseController {
  private readonly logger: Logger;

  constructor(private readonly service: MetricService) {
    Logger.log('New Instance of class', MetricController.name);
  }

  @Get('metrics')
  @LogMethod()
  async getMetrics() {
    const results = {
      Application_Errors: this.service.getMetrics(METRIC_TYPE_ENUM.APPLICATION),
      Database_Errors: this.service.getMetrics(METRIC_TYPE_ENUM.DATABASE),
      Validation_Errors: this.service.getMetrics(METRIC_TYPE_ENUM.VALIDATION),
      BadRequest_Errors: this.service.getMetrics(METRIC_TYPE_ENUM.BADREQUEST),
      Unknown_Errors: this.service.getMetrics(METRIC_TYPE_ENUM.UNKNOWN),
    };

    return results;
  }
}
