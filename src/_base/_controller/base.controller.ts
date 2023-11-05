import { Get, Delete, Param, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';

import { LogMethod } from '../_decorator/log.decorator';
import { PageOptionsDto } from '../_dto/page.options.dto';
import { IBaseController } from '../_interface/base.controller.interface';
import { IBaseEntity } from '../_interface/base.entity.interface';
import { IBaseReadController } from '../_interface/base.read.controller.interface';
import { IBaseReadService } from '../_interface/base.read.service.interface';

export abstract class BaseController<T> implements IBaseReadController, IBaseController {
  constructor(private readonly baseService: IBaseReadService<T>) {}

  @Get(':id')
  @LogMethod()
  async find(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOneById(id);
  }

  @Get()
  @LogMethod()
  async findAll(@Query(new ValidationPipe({ transform: true })) pageOptionsDto: PageOptionsDto): Promise<IBaseEntity> {
    if (pageOptionsDto.retAll === 1 && pageOptionsDto.whereStatement.length === 0) {
      return this.baseService.findAll();
    } else if (pageOptionsDto.retAll === 1 && pageOptionsDto.whereStatement.length > 0) {
      return this.baseService.findBySql(pageOptionsDto.whereStatement);
    } else {
      return this.baseService.findAllPaginated(pageOptionsDto, 'user');
    }
  }

  @Delete(':id')
  @LogMethod()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IBaseEntity> {
    return this.baseService.remove(id);
  }
}
