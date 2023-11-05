import { Injectable, Logger } from '@nestjs/common';

import { BaseService } from '../_base/_service/base.service';

import { METRIC_TYPE_ENUM } from './metric.type.enum';

@Injectable()
export class MetricService extends BaseService {
  static errorDatabase: number = 0;
  static errorApplication: number = 0;
  static errorValidation: number = 0;
  static errorUnknown: number = 0;
  static errorbadRequest: number = 0;
  static errorTimeout: number = 0;
  constructor() {
    super(MetricService.name);
    Logger.log('New Instance of class', MetricService.name);
  }

  async updateMetrics(type: METRIC_TYPE_ENUM): Promise<void> {
    switch (type) {
      case METRIC_TYPE_ENUM.APPLICATION:
        MetricService.errorApplication++;
        break;
      case METRIC_TYPE_ENUM.DATABASE:
        MetricService.errorDatabase++;
        break;
      case METRIC_TYPE_ENUM.VALIDATION:
        MetricService.errorValidation++;
        break;
      case METRIC_TYPE_ENUM.BADREQUEST:
        MetricService.errorbadRequest++;
        break;
      case METRIC_TYPE_ENUM.TIMEOUT:
        MetricService.errorTimeout++;
        break;
      case METRIC_TYPE_ENUM.UNKNOWN:
        MetricService.errorUnknown++;
    }
  }

  async getMetrics(type: METRIC_TYPE_ENUM): Promise<number> {
    switch (type) {
      case METRIC_TYPE_ENUM.APPLICATION:
        return MetricService.errorApplication;
      case METRIC_TYPE_ENUM.DATABASE:
        return MetricService.errorDatabase;
      case METRIC_TYPE_ENUM.VALIDATION:
        return MetricService.errorValidation;
      case METRIC_TYPE_ENUM.BADREQUEST:
        return MetricService.errorbadRequest;
      case METRIC_TYPE_ENUM.TIMEOUT:
        return MetricService.errorTimeout;
      case METRIC_TYPE_ENUM.UNKNOWN:
        return MetricService.errorUnknown;
    }
  }
}
