import { PageOptionsDto } from '@app/core/base/dto/page.options.dto';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';

export interface IBaseReadController {
  find(id: number): Promise<IBaseEntity>;
  findAll(pageOptionsDto: PageOptionsDto): Promise<IBaseEntity>;
  remove(id: number): Promise<IBaseEntity>;
}
