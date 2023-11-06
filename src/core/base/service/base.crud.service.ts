import { getProperties } from '@app/core/base/decorator/propertyDto.decorator';
import { PageDto } from '@app/core/base/dto/page.dto';
import { PageMetaDto } from '@app/core/base/dto/page.meta.dto';
import { PageOptionsDto } from '@app/core/base/dto/page.options.dto';
import { BadRequestError } from '@app/core/base/error/bad.request.error';
import { RecordNotFoundError } from '@app/core/base/error/record.not.found.error';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { IBaseReadService } from '@app/core/base/interface/base.read.service.interface';
import { IBaseService } from '@app/core/base/interface/base.service.interface';
import { LogMethod } from '@app/core/base/util/log.utils';
import { ReportEntity } from '@app/feature/report/report.entity';
import { Injectable, Logger, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { UserEntity } from '@app/shared/user/user.entity';
import { Repository, FindOptionsWhere, FindManyOptions, ILike, DeepPartial } from 'typeorm';

@Injectable()
export class BaseCrudService<T>
  implements IBaseReadService<T>, IBaseService, OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly className: string
  ) {}

  async onModuleDestroy() {
    Logger.log(`Service event ${this.onModuleDestroy.name} activated.`, this.className);
  }

  async onModuleInit() {
    Logger.log(`Service event ${this.onModuleInit.name} activated.`, this.className);
  }

  async onApplicationShutdown(signal: string) {
    Logger.log(`Service event ${this.onApplicationShutdown.name} activated with signal ${signal}.`, this.className);
  }

  @LogMethod()
  async findByManyOptions(fieldObject: FindManyOptions<T>) {
    return await this.repository.find(fieldObject);
  }

  @LogMethod()
  async searchEqual(searchFields: Extract<keyof T, string>[], search: string) {
    const queryBuilder = this.repository.createQueryBuilder('alias');
    const whereSearch: FindOptionsWhere<T> = {};
    searchFields.forEach((field) => (whereSearch[`${field}` as string] = ILike(`${search}`)));
    queryBuilder.andWhere(whereSearch);
    const [items, totalCount] = await queryBuilder.getManyAndCount();

    return { data: items, totalRecords: totalCount };
  }

  @LogMethod()
  async searchLike(searchFields: Extract<keyof T, string>[], search: string) {
    const queryBuilder = this.repository.createQueryBuilder('alias');
    const whereSearch: FindOptionsWhere<T> = {};
    searchFields.forEach((field) => (whereSearch[`${field}` as string] = ILike(`%${search}%`)));
    queryBuilder.andWhere(whereSearch);
    const [items, totalCount] = await queryBuilder.getManyAndCount();

    return { data: items, totalRecords: totalCount };
  }

  @LogMethod()
  async findAll() {
    return await this.repository.find();
  }

  @LogMethod()
  async findOneById(id: any) {
    if (!id) {
      throw new RecordNotFoundError(this.className, 'findOne', id);
    }
    const obj = await this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);
    if (!obj) {
      throw new RecordNotFoundError(this.className, 'findOne', id);
    }
    return obj;
  }

  @LogMethod()
  async findBySql(query: string, parameters?: any[]) {
    return await this.repository.query(query, parameters);
  }

  @LogMethod()
  async findAllPaginated(pageOptionsDto: PageOptionsDto, table: string) {
    const sortField: string = table + '.' + pageOptionsDto.sortField;
    const queryBuilder = this.repository.createQueryBuilder(table);

    queryBuilder.orderBy(sortField, pageOptionsDto.order).skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    if (pageOptionsDto.whereStatement.length > 0) {
      queryBuilder.where(pageOptionsDto.whereStatement);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  @LogMethod()
  async update(id: any, requestDto: any, userEntity: UserEntity) {
    const entityDto = this.getEntity();
    const obj = await this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);

    if (!this.CheckDTO2Entity(requestDto, entityDto)) {
      throw new BadRequestError(this.className, 'update');
    } else if (!obj) {
      throw new RecordNotFoundError(this.className, 'update', id);
    } else {
      requestDto.updatedBy = userEntity;
      await this.repository.merge(obj, requestDto);
      const a = await this.repository.save(obj);
      return a;
    }
  }

  @LogMethod()
  async create(requestDto: any, userEntity: UserEntity) {
    const entityDto = this.getEntity();

    if (!this.CheckDTO2Entity(requestDto, entityDto)) {
      throw new BadRequestError(this.className, 'create');
    } else {
      //Who created the record
      requestDto.createdBy = userEntity;
      const arrDto: DeepPartial<T>[] = [requestDto];
      const response: T[] = this.repository.create(arrDto);
      const entity = await this.repository.save(response);
      return entity[0];
    }
  }

  @LogMethod()
  async createMany(requestDto: any[], userEntity: UserEntity) {
    const entityDto = this.getEntity();

    requestDto.forEach((item) => {
      if (!this.CheckDTO2Entity(item, entityDto)) {
        throw new BadRequestError(this.className, 'create');
      }

      //Who created the record
      item.createdBy = userEntity;
    });

    const response: T[] = this.repository.create(requestDto);
    return await this.repository.save(response);
  }

  @LogMethod()
  async remove(id: any) {
    const obj = await this.repository.findOneBy({ id: id } as FindOptionsWhere<T>);
    if (!obj) {
      throw new RecordNotFoundError(this.className, this.remove.name, id);
    } else {
      return await this.repository.remove(obj);
    }
  }

  private CheckDTO2Entity(dto: any, entity: any): boolean {
    const arr = getProperties(entity);

    return Object.keys(dto).every((key) => arr.find((elem) => elem === key));
  }

  private getEntity(): IBaseEntity {
    const serviceName: string = this.constructor.name;

    switch (serviceName) {
      case 'UserService':
        return UserEntity;
      case 'ReportService':
        return ReportEntity;
    }
  }
}
