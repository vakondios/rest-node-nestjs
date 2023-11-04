import { IBaseEntity } from "src/_base/_interface/base.entity.interface";
import { Expose, Transform } from "class-transformer";

export class ReportResponseDto implements IBaseEntity {
    @Expose()
    id: number;
    
    @Expose()
    price:number;

    @Expose()
    make: string

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat:number;

    @Expose()
    mileage:number

    @Expose()
    approved:boolean

    // @Transform(({obj}) => obj.createdBy.id)
    // @Expose()
    // createdBy: number

    // @Transform(({obj}) => obj.updatedBy.id)
    // @Expose()
    // updatedBy: number
}