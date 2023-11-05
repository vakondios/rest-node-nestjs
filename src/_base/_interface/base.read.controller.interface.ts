import { PageOptionsDto } from '../_dto/page.options.dto';

import { IBaseEntity } from './base.entity.interface';

export interface IBaseReadController {
  find(id: number): Promise<IBaseEntity>;
  findAll(pageOptionsDto: PageOptionsDto): Promise<IBaseEntity>;
  remove(id: number): Promise<IBaseEntity>;
}
