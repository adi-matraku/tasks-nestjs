import { IsNotEmpty, MinLength } from 'class-validator';

export declare class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  description: string;

  @IsNotEmpty()
  statusId: number;

  @IsNotEmpty()
  typeId: number[];
}
