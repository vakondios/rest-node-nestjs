import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
