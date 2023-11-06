import { UserEntity } from '@app/shared/user/user.entity';
import { instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export abstract class BaseAbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  @IsOptional()
  updatedBy: number;

  toJSON() {
    return instanceToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
