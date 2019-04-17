import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@iaminfinity/express-cassandra';
import {UsersRepository} from './users.repository';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {HashService} from '../core/services/hash.service';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {UpdateUserDto} from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        private readonly hashService: HashService,
    ) {}

    findMany(query: PaginationDto): Promise<PaginatedResult<User>> {
        return this.usersRepository.findManyWithPagination({}, query);
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User with provided id is not found');
        }

        return user;
    }

    async createOne(dto: CreateUserDto): Promise<User> {
        const user = new User(dto);
        user.password = await this.hashService.generateHash(dto.password);
        return this.usersRepository.save(user).toPromise();
    }

    async updateById(id: string, dto: UpdateUserDto): Promise<User | undefined> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User with provided id is not found');
        }

        return this.usersRepository.updateById(id, dto);
    }

    async removeById(id: string): Promise<void> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User with provided id is not found');
        }

        await this.usersRepository.removeById(id);
    }
}