import {Module} from '@nestjs/common';
import {ExpressCassandraModule} from '@iaminfinity/express-cassandra';
import {PostEntity} from './post.entity';
import {PostsRepository} from './posts.repository';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {UsersModule} from '../users/users.module';

@Module({
    imports: [
        ExpressCassandraModule.forFeature([PostEntity, PostsRepository]),
        UsersModule,
    ],
    controllers: [PostsController],
    providers: [
        PostsService,
    ],
})
export class PostsModule {}