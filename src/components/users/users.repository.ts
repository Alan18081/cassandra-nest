import {EntityRepository, Repository} from '@iaminfinity/express-cassandra';
import {User} from './user.entity';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
// import {PaginationDto} from '../core/dto/pagination.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findManyWithPagination(dto: PaginationDto): Promise<PaginatedResult<User>> {
        this.a
        const [data, totalCount] = await Promise.all([
            this.findAndCount({ $limit: +dto.limit }, { $gt: { createdAt: dto.createdAt } })
            .toPromise(),
        ]);

        return {
            data,
            lastCreatedAt: data[data.length - 1].createdAt,
            totalCount,
            totalPages: Math.round(totalCount / +dto.limit),
            itemsPerPage: +dto.limit,
        };
    }

    findById(id: string): Promise<User | undefined> {
        return this.findOne({ id }).toPromise();
    }

}