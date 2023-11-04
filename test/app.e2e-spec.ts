import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/_base/_modules/app.module';
import { Repository } from 'typeorm';
import { UserEntity } from '../src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../src/user/user.service';
import { AuthService } from '../src/auth/auth.service';
import { SignUpAuthRequestDto } from '../src/auth/dto/auth.request.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;
  let userRepository: Repository<UserEntity>;
  let userRepositoryToken: string | Function = getRepositoryToken(UserEntity);
  let moduleFixture: TestingModule;
  let email: string = 'antonisg@vakondios.gr';
  let password: string =  'P@risL0nd0n';
  let firstname: string = "antonis";
  let lastname :string = 'vakondios';
  let username: string = 'avacondios';
  let signupObj: SignUpAuthRequestDto = {
    "email": email,
    "password": password,
    "firstname": firstname,
    "lastname": lastname,
    "username": username
  }
  beforeAll(async () => {
      moduleFixture = await Test.createTestingModule({
          imports: [
            AppModule,
          ],
          providers: [
              UserService, AuthService,
              {
                  provide: userRepositoryToken,
                  useValue: userRepository,
              }
          ],
      }).compile();

      userService = moduleFixture.get<UserService>(UserService);
      authService = moduleFixture.get<AuthService>(AuthService);
      userRepository = moduleFixture.get<Repository<UserEntity>>(userRepositoryToken);
});


beforeEach(async () => {
      app = moduleFixture.createNestApplication();
      await app.init();
});

  it('signup', () => {
   userRepository.query(`DELETE FROM "user";`);
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(
        signupObj
      )
      .expect(201)
      .then((res)=> {
        const {email, username, firstname, lastname } = res.body;
        expect(email).toBeDefined();
        expect(email).toEqual(email);
      })
    
  });

  it('signin', async () => {
    //userRepository.query(`DELETE FROM "user";`);
    const res= await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        "username": username,
        "password": password
      }).expect(201);

      const cookie = res.get('Set-Cookie');
    
     const {body} = await request(app.getHttpServer())
        .get('/auth/whoami')
        .set('Cookie', cookie)
        .expect(200);

        expect(body.email).toEqual(email);
   });

   it('create new user', async () => {
      userRepository.query(`DELETE FROM "user";`);
      const res = await authService.signup(signupObj);
      expect(email).toEqual(res.email);
   });
});
