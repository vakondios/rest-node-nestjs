import { PropertyDto } from '@app/core/base/decorator/propertyDto.decorator';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { ReportEntity } from '@app/feature/report/report.entity';
import { instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Entity, Column, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity implements IBaseEntity {
  @PrimaryGeneratedColumn()
  @PropertyDto()
  id: number;

  @Column()
  @CreateDateColumn()
  @PropertyDto()
  createdAt: string;

  @Column({ nullable: true })
  @UpdateDateColumn()
  @PropertyDto()
  updatedAt: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  @IsOptional()
  @PropertyDto()
  updatedBy: number;

  @Column()
  @PropertyDto()
  email: string;

  @Column({ unique: true })
  @PropertyDto()
  username: string;

  @Column({ nullable: true })
  @PropertyDto()
  password: string;

  @Column()
  @PropertyDto()
  firstname: string;

  @Column()
  @PropertyDto()
  lastname: string;

  @Column('boolean', { default: true, nullable: true })
  @PropertyDto()
  isAdmin: boolean;

  @Column('boolean', { default: false, nullable: true })
  @PropertyDto()
  isApproved: boolean;

  @Column('boolean', { default: true, nullable: true })
  @PropertyDto()
  canDelete: boolean;

   @OneToMany(() => ReportEntity, (reportEntity) => reportEntity.createdBy)
   reports: ReportEntity[];

   toJSON() {
    return instanceToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
 }
