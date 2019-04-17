import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class RemovePostDto {

    @ApiModelProperty()
    @IsString()
    authorId: string;

}