import {IsOptional, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UpdatePostDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    text?: string;

}