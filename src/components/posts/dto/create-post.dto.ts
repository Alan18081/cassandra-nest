import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreatePostDto {

    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelProperty()
    @IsString()
    text: string;

    @ApiModelProperty()
    @IsString()
    authorId: string;

}