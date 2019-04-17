import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import {
    mockEmailsClient,
    mockHashService,
    mockUser,
    mockUsersRepository,
} from './mocks';
import {HashService} from '../../core/services/hash.service';
import {CreateUserDto} from '../dto/create-user.dto';
import {UsersRepository} from '../users.repository';

describe('UsersService', () => {
  let usersService;
  const mockUsers = [new User({}), new User({})];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          UsersService,
          { provide: UsersRepository, useValue: mockUsersRepository },
          { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersService.emailsClient = mockEmailsClient;
    // usersService.usersRepository = mockUsersRepository;
  });

  describe('findMany', () => {
    it('should call usersRepository.findMany', async () => {
       const spy = jest.spyOn(mockUsersRepository, 'findMany').mockImplementation(async () => mockUsers);
       await usersService.findMany();
       expect(spy).toBeCalledWith({});
    });

      it('should return array of users', async () => {
        jest.spyOn(mockUsersRepository, 'findMany').mockImplementation(async () => mockUsers);
        expect(await usersService.findMany()).toEqual(mockUsers);
      });
  });

  describe('findById', () => {
    const id = 20;
    it('should call usersRepository.findById', async () => {
        const spy = jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
        await usersService.findById(id);
        expect(spy).toBeCalledWith(id);
    });

    it('should return user', async () => {
        jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
        expect(await usersService.findById(id)).toEqual(mockUser);
    });
  });
  //
  // describe('findOneByEmail', () => {
  //    const id = 20;
  //    it('should call usersRepository.findOneByEmail', async () => {
  //       const spy = jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
  //       await usersService.findOneByEmail(id);
  //       expect(spy).toBeCalledWith(id);
  //    });
  //
  //    it('should return user', async () => {
  //       jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
  //       expect(await usersService.findOneByEmail(id)).toEqual(mockUser);
  //    });
  // });

    describe('updateById', () => {
        it('should call usersRepository.updateOne', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'updateById').mockImplementation(async () => mockUser);
            await usersService.updateById(mockUser.id, { name: 'Markus' });
            expect(spy).toBeCalledWith(mockUser.id, { name: 'Markus' });
        });

        it('should return user', async () => {
            jest.spyOn(mockUsersRepository, 'updateById').mockImplementation(async () => mockUser);
            expect(await usersService.updateById(mockUser.id, { name: 'Alan' })).toEqual(mockUser);
        });
    });

    describe('removeById', () => {
        const id = 20;
        it('should call usersRepository.removeById', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'removeById').mockImplementation(async () => {});
            await usersService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

  // describe('findManyWithPagination', () => {
  //   const query: Required<PaginationDto> = {
  //     page: 1,
  //     limit: 2,
  //   };
  //   const paginatedResult: PaginatedResponse<User> = {
  //     itemsPerPage: query.limit,
  //     totalCount: 5,
  //     page: query.page,
  //     data: mockUsers,
  //   };
  //   it('should return paginated result', async () => {
  //     jest.spyOn(usersService, 'prepareBuilder').mockImplementation(() =>  ({
  //       skip() {
  //         return this;
  //       },
  //       async getCount() {
  //         return 5;
  //       },
  //       take() {
  //         return this;
  //       },
  //       async getMany() {
  //         return mockUsers;
  //       }
  //     }));
  //
  //     const result = await usersService.findManyWithPagination(query);
  //
  //     expect(result).toEqual(paginatedResult);
  //   });
  //
  // });

  describe('createOne', () => {
      const payload: CreateUserDto = {
          firstName: 'Alan',
          lastName: 'Morgan',
          email: 'gogunov00@gmail.com',
          password: 'hello',
      };

    it('should create new user and return it', async () => {
       const result = {
         ...new User({}),
         ...payload,
         password: 'Some hash',
       };
       jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => result.password);
       jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => undefined);
       jest.spyOn(mockUsersRepository, 'save').mockImplementation(async () => result);

       expect(await usersService.createOne(payload)).toEqual(result);
    });

    // it('should throw an exception if user with provided email already exists',  async () => {
    //   jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => {});
    //   try {
    //     await usersService.createOne(payload);
    //     expect(false);
    //   } catch (e) {
    //     expect(JSON.stringify(e)).toEqual(JSON.stringify(new NotFoundException(Messages.USER_ALREADY_EXISTS)));
    //   }
    // });
  });

});