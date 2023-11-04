import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

it('Can create an instance of auth service',async()=> {
    //create a fake copy of the users service
    const fakeUserService = {
        createUser: (createUserRequestControllerDto: any) => 
        Promise.resolve({id:1, email:'avac2005@yahoo.com', username:'avacondios', password:'123', firstname:'Antonis', lastname:'Vakondios' })
    };

    const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService, 
            {
                provide: UserService,
                useValue: fakeUserService
            }]
    }).compile();

    const service = module.get(AuthService);
    expect(service).toBeDefined();

})

