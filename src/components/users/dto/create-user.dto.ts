import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @ApiModelProperty()
    lastName: string;

    @IsEmail()
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    password: string;
}