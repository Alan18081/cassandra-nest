import {IsEmail, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiModelProperty()
    @IsEmail()
    @IsOptional()
    email?: string;
}