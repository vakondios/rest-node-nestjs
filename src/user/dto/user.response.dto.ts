import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IBaseEntity } from 'src/_base/_interface/base.entity.interface';

export class UserResponseDto implements IBaseEntity {
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastname: string;

  // @Transform(({obj}) => obj.createdBy.id)
  // @Expose()
  // createdBy: number;
}
