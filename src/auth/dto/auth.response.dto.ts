import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IBaseEntity } from "../../_base/_interface/base.entity.interface";

export class SignUpAuthResponseDto implements IBaseEntity {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    lastname: string;
}

export class SignInAuthResponseDto implements IBaseEntity {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    lastname: string;
}