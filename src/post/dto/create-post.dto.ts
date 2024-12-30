import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    authorId: number;
}
