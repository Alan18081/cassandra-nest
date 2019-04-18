import {EntityRepository} from '@iaminfinity/express-cassandra';
import {PostEntity} from './post.entity';
import {BaseRepository} from '../core/base.repository';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';

@EntityRepository(PostEntity)
export class PostsRepository extends BaseRepository<PostEntity> {

    findManyByAuthor(authorId: string, pageDto: PaginationDto): Promise<PaginatedResult<PostEntity>> {
        return this.findManyWithPagination({ authorId }, pageDto);
    }

}