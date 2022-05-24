import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class EditTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsOptional()
  @IsNotEmpty()
  @ArrayNotEmpty()
  typeId: number[];
}
