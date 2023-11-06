import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';

import { AppModule } from '@app/app.module';
import { AuthService } from '@app/shared/auth/auth.service';
import { SignUpAuthRequestDto } from '@app/shared/auth/dto/auth.request.dto';
import { UserEntity } from '@app/shared/user/user.entity';
import { UserService } from '@app/shared/user/user.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  // let userService: UserService;
  let authService: AuthService;
  let userRepository: Repository<UserEntity>;
  const userRepositoryToken: string | Function = getRepositoryToken(UserEntity);
  let moduleFixture: TestingModule;
  const email: string = 'antonisg@vakondios.gr';
  const password: string = 'UEByaXNMMG5kMG4gICByZnJ0cmV0ZXJ0';
  const firstname: string = 'antonis';
  const lastname: string = 'vakondios';
  const username: string = 'avacondios';
  const signupObj: SignUpAuthRequestDto = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    username: username,
  };
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UserService,
        AuthService,
        {
          provide: userRepositoryToken,
          useValue: userRepository,
        },
      ],
    }).compile();

    //userService = moduleFixture.get<UserService>(UserService);
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
      .send(signupObj)
      .expect(201)
      .then((res) => {
        const { email } = res.body;
        expect(email).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signin', async () => {
    //userRepository.query(`DELETE FROM "user";`);
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        username: username,
        password: password,
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer()).get('/auth/whoami').set('Cookie', cookie).expect(200);

    expect(body.email).toEqual(email);
  });

  it('create new user', async () => {
    userRepository.query(`DELETE FROM "user";`);
    const res = await authService.signup(signupObj);
    expect(email).toEqual(res.email);
  });
});
