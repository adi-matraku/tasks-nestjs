import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  role: number;
}
