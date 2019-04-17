import { Test } from '@nestjs/testing';
import { CoreModule } from '../../core/core.module';
import { User } from '../user.entity';
import {UsersRepository} from '../users.repository';
import {mockUser} from './mocks';

describe('UsersRepository', () => {
  let usersRepository;
  const mockUsers = [new User({}), new User({})];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          UsersRepository,
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('findById', () => {
    const id = 20;
    it('should call usersRepository.findOne', async () => {
        const spy = jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        await usersRepository.findById(id);
        expect(spy).toBeCalledWith({ id });
    });

    it('should return user', async () => {
        jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        expect(await usersRepository.findById(id)).toEqual(mockUser);
    });
  });

    describe('updateById', () => {
        const id = 20;
        const data = {
            firstName: 'Alex',
        };
        it('should call usersRepository.update', async () => {
            const spy = jest.spyOn(usersRepository, 'update').mockImplementation(() => ({
                toPromise: async () => {},
            }));
            await usersRepository.updateById(id, data);
            expect(spy).toBeCalledWith({ id }, data);
        });
    });

    describe('removeById', () => {
        const id = 20;
        it('should call usersRepository.delete', async () => {
            const spy = jest.spyOn(usersRepository, 'delete').mockImplementation(async () => ({
                toPromise: async () => {},
            }));
            await usersRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
    });

});