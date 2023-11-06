import { PageOptionsDto } from '@app/core/base/dto/page.options.dto';
import { IBaseController } from '@app/core/base/interface/base.controller.interface';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { IBaseReadController } from '@app/core/base/interface/base.read.controller.interface';
import { IBaseReadService } from '@app/core/base/interface/base.read.service.interface';
import { LogMethod } from '@app/core/base/util/log.utils';
import { Get, Delete, Param, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common';

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
