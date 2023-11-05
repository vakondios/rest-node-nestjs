import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseCrudService } from '../_base/_service/base.crud.service';

import { GetEstimateDto } from './dto/report.request.dto';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportService extends BaseCrudService<ReportEntity> {
  constructor(@InjectRepository(ReportEntity) repository: Repository<ReportEntity>) {
    super(repository, ReportEntity.name);
    Logger.log('New Instance of class', ReportEntity.name);
  }

  async createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return (
      this.repository
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make =:make', { make })
        .andWhere('model =:model', { model })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        //.orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }
}
