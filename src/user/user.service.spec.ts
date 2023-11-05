import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
// ...

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const userRepositoryToken: string | Function = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        {
          provide: userRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(userRepositoryToken);
  });

  describe('checkIfUserAlreadyExistsByEmail', () => {
    it('should return false if user does not exist', async () => {
      const newUserEmail = 'test.email@gmail.com';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await userService.checkIfUserAlreadyExistsByEmail(newUserEmail);

      expect(result).toBe(false);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: newUserEmail } });
    });

    it('should return true if user exists', async () => {
      const newUserEmail = 'test.email@gmail.com';
      const existingUser = { id: 1, email: newUserEmail } as UserEntity;

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(existingUser);

      const result = await userService.checkIfUserAlreadyExistsByEmail(newUserEmail);

      expect(result).toBe(true);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: newUserEmail } });
    });
  });
});
