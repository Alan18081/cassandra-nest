import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {PostsService} from './posts.service';
import {CreatePostDto} from './dto/create-post.dto';
import {PostEntity} from './post.entity';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {PaginationDto} from '../core/dto/pagination.dto';
import {RemovePostDto} from './dto/remove-post.dto';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {UpdatePostDto} from './dto/update-post.dto';
import {FindManyPostsDto} from './dto/find-many-posts.dto';

@ApiUseTags('posts')
@Controller('posts')
export class PostsController {

    constructor(
       private readonly postsService: PostsService,
    ) {}

    @Get()
    @ApiOperation({ title: 'Find many posts' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Posts are found' })
    findMany(@Query() dto: FindManyPostsDto): Promise<PaginatedResult<PostEntity>> {
        return this.postsService.findMany(dto);
    }

    @Get(':id')
    @ApiOperation({ title: 'Find post by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Post is found by id' })
    findById(@Param('id') id: string): Promise<PostEntity | undefined> {
        return this.postsService.findById(id);
    }

    @Post()
    @ApiOperation({ title: 'Create post' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Post is created' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with provided id is not found' })
    createOne(@Body() dto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createOne(dto);
    }

    @Patch(':id')
    @ApiOperation({ title: 'Update post' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Post is updated' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post with provided id is not found' })
    updateById(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<PostEntity | undefined> {
        return this.postsService.updateById(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete post' })
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Post is deleted' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post with provided id is not found' })
    async removeById(@Param('id') id: string, @Query() dto: RemovePostDto): Promise<void> {
        await this.postsService.removeById(id, dto.authorId);
    }

}