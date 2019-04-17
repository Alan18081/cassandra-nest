import {EntityRepository} from '@iaminfinity/express-cassandra';
import {PostEntity} from './post.entity';
import {BaseRepository} from '../core/base.repository';

@EntityRepository(PostEntity)
export class PostsRepository extends BaseRepository<PostEntity> {}