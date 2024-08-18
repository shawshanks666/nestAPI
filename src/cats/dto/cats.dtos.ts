import { IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class CreateCatsDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  breed: string;

  @IsNotEmpty()
  @MinLength(3)
  nature: string;

  @IsNotEmpty()
  @MinLength(1)
  age: number;


}

export class UpdateCatsDto {
  @IsOptional() // Mark as optional
  @MinLength(1)
  name?: string; // Use optional chaining

  @IsOptional() // Mark as optional
  @MinLength(3)
  breed?: string; // Use optional chaining

  @IsOptional() // Mark as optional
  @MinLength(3)
  nature?: string; // Use optional chaining

  @IsNotEmpty()
  @MinLength(1)
  age: number;
}