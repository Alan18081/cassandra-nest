import {EntityRepository, Repository} from '@iaminfinity/express-cassandra';
import {User} from './user.entity';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async findManyWithPagination(dto: PaginationDto): Promise<PaginatedResult<User>> {
        const [data, [allData, totalCount]] = await Promise.all([
           this.find({ $limit: dto.limit  }, { $gt: { createdAt: dto.createdAt } }).toPromise(),
           this.findAndCount({}).toPromise(),
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

    async updateById(id: string, dto: Partial<User>): Promise<User | undefined> {
        await this.update({ id }, dto).toPromise();
        return this.findById(id);
    }

    async removeById(id: string): Promise<void> {
        await this.delete({ id }).toPromise();
    }
}