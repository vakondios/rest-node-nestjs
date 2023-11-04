import { Injectable, Logger } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { BaseCrudService } from '../_base/_service/base.crud.service';
import { UniqueFieldExitsError } from '../_base/_error/unique.field.exists.error';
import { LogMethod } from '../_base/_decorator/log.decorator';
import { IBaseEntity } from '../_base/_interface/base.entity.interface';

@Injectable()
export class UserService extends BaseCrudService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity) repository: Repository<UserEntity>
    ){
        super(repository, UserService.name);
        Logger.log('New Instance of class', UserService.name);
    }

    /**
     * Creates a new user with a unique 'username' and without password
     * @param createUserRequestControllerDto 
     * {username: '', email: '', firstname: '', lastname:''}
     * ***all fields are mandatory***
     * 
     * @returns the user entity
     */
    @LogMethod()
    async createUser(createUserRequestControllerDto: any, userEntity:UserEntity): Promise<IBaseEntity> {
        //Check if the username exists
        const ret = await this.searchEqual(['username'], createUserRequestControllerDto.username);
        if ( ret.totalRecords === 0) {
            return await this.create(createUserRequestControllerDto,userEntity);
        } else {
            throw new UniqueFieldExitsError(UserService.name, 'createUser', createUserRequestControllerDto.username)
        }
    }

    public async checkIfUserAlreadyExistsByUsername(username: string): Promise<boolean> {
        const user = await this.repository.findOne({ where: { username } });
        return !!user;
    } 

    public async checkIfUserAlreadyExistsByEmail(email: string): Promise<boolean> {
        const user = await this.repository.findOne({ where: { email } });
        return !!user;
    } 
}

