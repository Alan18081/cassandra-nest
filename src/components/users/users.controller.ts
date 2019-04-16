import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {PaginationDto} from '../core/dto/pagination.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PaginatedResult} from '../core/interfaces/paginated-result';

@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
    ) {}

    @Get()
    async findMany(@Query() query: PaginationDto): Promise<PaginatedResult<User>> {
        return this.usersService.findMany(query);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | undefined> {
        return this.usersService.findById(id);
    }

    @Post()
    async createOne(@Body() dto: CreateUserDto): Promise<User> {
       return this.usersService.createOne(dto);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User | undefined> {
        return this.usersService.updateById(id, dto);
    }

    @Delete(':id')
    removeById(@Param('id') id: string): Promise<void> {
        return this.usersService.removeById(id);
    }
}