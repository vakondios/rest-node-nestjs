import { IsBoolean, IsCurrency, IsEmail, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { IBaseEntity } from "../../_base/_interface/base.entity.interface";
import { Transform, Type } from "class-transformer";
import { Optional } from "@nestjs/common";

export class CreateReportRequestDto implements IBaseEntity {

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price:number;

    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat:number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(1000000)
    mileage:number

}

export class UpdateReportRequestDto implements IBaseEntity {

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @IsOptional()
    price:number;

    @IsString()
    @IsOptional()
    make: string;

    @IsString()
    @IsOptional()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1930)
    @Max(2050)
    @IsOptional()
    year: number;

    @IsLongitude()
    @IsOptional()
    lng: number;

    @IsLatitude()
    @IsOptional()
    lat:number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @IsOptional()
    mileage:number

    @IsOptional()
    @IsBoolean()
    approved:boolean
}

export class GetEstimateDto implements IBaseEntity {

    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    @Min(1930)
    @Max(2050)
    year: number;

    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    lat:number;

    @Transform(({value}) => parseInt(value))
    @IsInt()
    @Min(0)
    @Max(1000000)
    mileage?: number =10;
}