// import { IsNumber, IsString } from 'nestjs-swagger-dto';
import {
  ArrayNotEmpty,
  IsNumber,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  typeId: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
