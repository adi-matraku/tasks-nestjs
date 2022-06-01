import { IsNumber, IsString } from 'nestjs-swagger-dto';
import { ArrayNotEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  typeId: number[];

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
