import {IsString} from 'class-validator';
import {PaginationDto} from '../../core/dto/pagination.dto';
import {ApiModelProperty} from '@nestjs/swagger';

export class FindManyPostsDto extends PaginationDto {

    @ApiModelProperty()
    @IsString()
    authorId: string;

}