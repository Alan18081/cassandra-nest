import {IsDateString, IsNumberString, IsOptional} from 'class-validator';

export class PaginationDto {
    @IsDateString()
    @IsOptional()
    createdAt?: number;

    @IsNumberString()
    @IsOptional()
    limit?: number;
}