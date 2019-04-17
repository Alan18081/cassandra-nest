import {Injectable, NotFoundException} from '@nestjs/common';
import {PostsRepository} from './posts.repository';
import {InjectRepository} from '@iaminfinity/express-cassandra';
import {PostEntity} from './post.entity';
import {CreatePostDto} from './dto/create-post.dto';
import {UsersService} from '../users/users.service';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {FindManyPostsDto} from './dto/find-many-posts.dto';

@Injectable()
export class PostsService {

    constructor(
       @InjectRepository(PostsRepository)
       private readonly postsRepository: PostsRepository,
       private readonly usersService: UsersService,
    ) {}

    findMany(dto: FindManyPostsDto): Promise<PaginatedResult<PostEntity>> {
        return this.postsRepository.findManyWithPagination({ authorId: dto.authorId }, { createdAt: dto.createdAt, limit: dto.limit });
    }

    async findById(id: string): Promise<PostEntity | undefined> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post with provided id is not found');
        }

        return post;
    }

    async createOne(dto: CreatePostDto): Promise<PostEntity> {
        const user = await this.usersService.findById(dto.authorId);
        if (!user) {
            throw new NotFoundException('User with provided id is not found');
        }

        const post = new PostEntity(dto);
        post.authorInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return this.postsRepository.save(post).toPromise();
    }

    async removeById(id: string, authorId: string): Promise<void> {
        const user = await this.usersService.findById(authorId);
        if (!user) {
            throw new NotFoundException('User with provided id is not found');
        }

        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post with provided id is not found');
        }

        await this.postsRepository.removeById(id);
    }

}