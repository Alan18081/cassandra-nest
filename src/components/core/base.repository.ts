import {Repository, uuid} from '@iaminfinity/express-cassandra';
import {PaginatedResult} from './interfaces/paginated-result';
import {PaginationDto} from './dto/pagination.dto';

export class BaseRepository<T> extends Repository<T> {
    async findManyWithPagination(query: Partial<T>, dto: PaginationDto): Promise<PaginatedResult<T>> {
        const [data, [allData, totalCount]] = await Promise.all([
            this.find({ $limit: +dto.limit, ...query  }, { $gt: { createdAt: dto.createdAt } }).toPromise(),
            this.findAndCount({}).toPromise(),
        ]);

        return {
            data,
            lastCreatedAt: data.length > 0 ? data[data.length - 1].createdAt : null,
            totalCount,
            totalPages: Math.round(totalCount / +dto.limit),
            itemsPerPage: +dto.limit,
        };
    }

    findById(id: string): Promise<T | undefined> {
        return this.findOne({ id: uuid(id) }).toPromise();
    }

    async updateById(id: string, dto: Partial<T>): Promise<T | undefined> {
        await this.update({ id }, dto).toPromise();
        return this.findById(id);
    }

    async removeById(id: string): Promise<void> {
        await this.delete({ id }).toPromise();
    }

}