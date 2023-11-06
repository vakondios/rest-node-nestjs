import { PropertyDto } from '@app/core/base/decorator/propertyDto.decorator';
import { BaseAbstractEntity } from '@app/core/base/entity/base.abstract';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report')
export class ReportEntity extends BaseAbstractEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @PropertyDto()
  price: number;

  @Column()
  @PropertyDto()
  make: string;

  @Column()
  @PropertyDto()
  model: string;

  @Column()
  @PropertyDto()
  year: number;

  @Column()
  @PropertyDto()
  lng: number;

  @Column()
  @PropertyDto()
  lat: number;

  @Column()
  @PropertyDto()
  mileage: number;

  @Column({ default: false })
  @PropertyDto()
  approved: boolean;
}
