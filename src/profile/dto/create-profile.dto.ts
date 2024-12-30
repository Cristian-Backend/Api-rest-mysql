import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;  // Cambié 'firstName' a 'firstname'

  @IsString()
  @IsNotEmpty()
  lastname: string;  // Cambié 'lastName' a 'lastname'

  @IsOptional()
  @IsInt()
  age?: number;

 
  @IsInt()
  phone: number;
}
