import { instanceToPlain } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { UserEntity } from '../../user/user.entity';

@Entity()
export  abstract class BaseAbstractEntity  {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: string;

    @Column({nullable: true})
    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(()=> UserEntity, (userEntity => userEntity.id))
    createdBy: UserEntity;
    
    @ManyToOne(()=> UserEntity, (userEntity => userEntity.id))
    @IsOptional()
    updatedBy: number;

 

    toJSON() {
        return instanceToPlain(this);
      }

    toString() {
        return JSON.stringify(this.toJSON());
    }



}