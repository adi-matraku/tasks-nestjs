import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TaskTypeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
