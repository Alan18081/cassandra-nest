import {EntityRepository} from '@iaminfinity/express-cassandra';
import {User} from './user.entity';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {BaseRepository} from '../core/base.repository';

@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {
}