import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {PostEntity} from './post.entity';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {PaginationDto} from '../core/dto/pagination.dto';
import {RemovePostDto} from './dto/remove-post.dto';

@Controller('posts')
export class PostsController {

    constructor(
       private readonly postsService: PostsService,
    ) {}

    @Get()
    findMany(@Query() dto: PaginationDto): Promise<PaginatedResult<PostEntity>> {
        return this.postsService.findMany(dto);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<PostEntity | undefined> {
        return this.postsService.findById(id);
    }

    @Post()
    async createOne(@Body() dto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createOne(dto);
    }

    @Delete(':id')
    async removeById(@Param('id') id: string, @Query() dto: RemovePostDto): Promise<void> {
        await this.postsService.removeById(id, dto.authorId);
    }

}