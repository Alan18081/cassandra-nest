import {Injectable, NotFoundException} from '@nestjs/common';
import {PostsRepository} from './posts.repository';
import {InjectRepository} from '@iaminfinity/express-cassandra';
import {PostEntity} from './post.entity';
import {CreatePostDto} from './dto/create-post.dto';
import {UsersService} from '../users/users.service';
import {PaginationDto} from '../core/dto/pagination.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {FindManyPostsDto} from './dto/find-many-posts.dto';
import {UpdatePostDto} from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(
       @InjectRepository(PostsRepository)
       private readonly postsRepository: PostsRepository,
       private readonly usersService: UsersService,
    ) {}

    findMany(dto: FindManyPostsDto): Promise<PaginatedResult<PostEntity>> {
        if (dto.authorId) {
            return this.postsRepository.findManyByAuthor(dto.authorId, { createdAt: dto.createdAt, limit: dto.limit });
        }
        return this.postsRepository.findManyWithPagination(
            { },
            { createdAt: dto.createdAt, limit: dto.limit },
        );
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

    async updateById(id: string, dto: UpdatePostDto): Promise<PostEntity | undefined> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post with provided id is not found');
        }

        return this.postsRepository.updateById(id, dto);
    }

    async removeById(id: string): Promise<void> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post with provided id is not found');
        }

        await this.postsRepository.removeById(id);
    }

}