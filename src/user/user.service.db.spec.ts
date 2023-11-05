import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TestDatabaseModule } from '../_base/_modules/test.database.module';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const userRepositoryToken: string | Function = getRepositoryToken(UserEntity);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule],
      providers: [
        UserService,
        {
          provide: userRepositoryToken,
          useValue: userRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(userRepositoryToken);
  });

  beforeEach(async () => {
    await userRepository.query(`TRUNCATE TABLE "user" CASCADE;`);
    // await userRepository.save(
    //      {username: 'avacondios3', email: 'antonis@vakondios.gr', firstname: 'Antonis', lastname:'Vakondios'});
  });

  describe('checkIfUserAlreadyExistsByUsername', () => {
    it('should return false if the user does not exist', async () => {
      const username = 'avacondios35';
      const userRepositoryFindOneSpy = jest.spyOn(userRepository, 'findOne');

      const userExists = await userService.checkIfUserAlreadyExistsByUsername(username);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({ where: { username: username } });
      expect(userExists).toEqual(false);
    });

    it('should return true if the user exists', async () => {
      const username = 'avacondios1';
      await userRepository.save({
        username: username,
        email: 'test@email.test',
        firstname: 'Test',
        lastname: 'Test',
      });
      const userRepositoryFindOneSpy = jest.spyOn(userRepository, 'findOne');

      const userExists = await userService.checkIfUserAlreadyExistsByUsername(username);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({ where: { username: username } });
      expect(userExists).toEqual(true);
    });
  });
});
