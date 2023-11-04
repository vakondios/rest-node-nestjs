import { Entity, Column, BaseEntity, OneToMany} from 'typeorm';
import { BaseAbstractEntity } from '../_base/_entity/_base.abstract';
import { PropertyDto } from '../_base/_decorator/propertyDto.decorator';
import { IBaseEntity } from '../_base/_interface/base.entity.interface';
import { ReportEntity } from '../reports/report.entity';

@Entity('user')
export class UserEntity extends BaseAbstractEntity implements IBaseEntity{
    
    @Column()
    @PropertyDto()
    email: string;

    @Column({ unique: true })
    @PropertyDto()
    username: string

    @Column({nullable: true})
    @PropertyDto()
    password: string;

    @Column()
    @PropertyDto()
    firstname: string;

    @Column()
    @PropertyDto()
    lastname: string;
 
    @Column('boolean', {default: true,nullable: true})
    @PropertyDto()
    isAdmin: boolean;

    @Column('boolean', {default: false,nullable: true})
    @PropertyDto()
    isApproved: boolean;

    @Column('boolean', {default: true,nullable: true})
    @PropertyDto()
    canDelete: boolean;

    @OneToMany(()=> ReportEntity, (reportEntity) => reportEntity.createdBy)
    reports: ReportEntity[];
}
