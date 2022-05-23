import { IsNumber } from 'class-validator';

export class editTaskDto {
  @IsNumber()
  pageNumber: number;
  @IsNumber()
  pageSize: number;
}
