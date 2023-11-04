import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { IBaseEntity } from "../../_base/_interface/base.entity.interface";

export class CreateUserRequestControllerDto implements IBaseEntity {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
};

export class UpdateUserRequestControllerDto implements IBaseEntity {
    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    lastname: string;
};