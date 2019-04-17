import {IsString} from 'class-validator';

export class RemovePostDto {

    @IsString()
    authorId: string;

}