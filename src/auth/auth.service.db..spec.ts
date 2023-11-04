import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { TestDatabaseModule } from "../_base/_modules/test.database.module";
import { SignUpAuthRequestDto } from "./dto/auth.request.dto";
import { AuthService } from "./auth.service";

describe('AuthService', () => {
    let userService: UserService;
    let authService: AuthService;
    let userRepository: Repository<UserEntity>;

    let userRepositoryToken: string | Function = getRepositoryToken(UserEntity);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TestDatabaseModule,
            ],
            providers: [
                UserService, AuthService,
                {
                    provide: userRepositoryToken,
                    useValue: userRepository,
                }
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<Repository<UserEntity>>(userRepositoryToken);
    });

    beforeEach(async () => {
        await userRepository.query(`TRUNCATE TABLE "user" CASCADE;`);
    });

    describe('signup', () => {
        
        it('should return true if the user exists', async () => {
            const signUpAuthRequestDto = new SignUpAuthRequestDto();
            signUpAuthRequestDto.email='avac2005@yahoo.com';
            signUpAuthRequestDto.username = 'avac2005';
            signUpAuthRequestDto.firstname = 'Antonis';
            signUpAuthRequestDto.lastname ='Vakondios';
            signUpAuthRequestDto.password ='123';

            const userRepositoryFindOneSpy = jest.spyOn(userRepository, 'findOne');

            const userExists = await authService.signup(signUpAuthRequestDto);
            
            
    
    
    
            expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({ where: { username: signUpAuthRequestDto.username } });
            expect(userExists).toEqual(true);
        });
    });
});