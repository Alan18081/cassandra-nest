import {Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {PaginationDto} from '../core/dto/pagination.dto';

@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
    ) {}

    @Get()
    async findMany(@Query() query: PaginationDto): Promise<User[]> {
        return this.usersService.findMany(query);
    }

    @Post()
    async createOne(@Body() dto: CreateUserDto): Promise<User> {
       return this.usersService.createOne(dto);
    }

}