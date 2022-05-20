import { IsNotEmpty } from 'class-validator';

export declare class CreateTaskDto {
  @IsNotEmpty()
  statusId: number;
  @IsNotEmpty()
  typeId: number[];
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
