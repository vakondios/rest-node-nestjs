import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserRequestControllerDto implements IBaseEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class UpdateUserRequestControllerDto implements IBaseEntity {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;
}
