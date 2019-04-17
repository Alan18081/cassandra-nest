import {IsString} from 'class-validator';
import {PaginationDto} from '../../core/dto/pagination.dto';

export class FindManyPostsDto extends PaginationDto {

    @IsString()
    authorId: string;

}