import {Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseInterceptors, Patch} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {PaginationDto} from '../core/dto/pagination.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiOperation({ title: 'Find users' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Users are found' })
    async findMany(@Query() query: PaginationDto): Promise<PaginatedResult<User>> {
        return this.usersService.findMany(query);
    }

    @Get(':id')
    @ApiOperation({ title: 'Find user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User is found' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with provided id is not found' })
    async findById(@Param('id') id: string): Promise<User | undefined> {
        return this.usersService.findById(id);
    }

    @Post()
    @ApiOperation({ title: 'Create user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User is created' })
    async createOne(@Body() dto: CreateUserDto): Promise<User> {
       return this.usersService.createOne(dto);
    }

    @Patch(':id')
    @ApiOperation({ title: 'Update user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User is updated' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with provided id is not found' })
    async updateById(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User | undefined> {
        return this.usersService.updateById(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ title: 'Delete user by id' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User is deleted' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User with provided id is not found' })
    removeById(@Param('id') id: string): Promise<void> {
        return this.usersService.removeById(id);
    }
}