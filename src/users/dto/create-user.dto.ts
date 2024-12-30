import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;
    

    @IsEmail()
    email: string;


    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(6)
    password: string;


}
