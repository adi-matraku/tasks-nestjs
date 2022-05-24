import { IsNumber, IsString } from 'class-validator';

export class queryDto {
  @IsNumber()
  pageNumber: number;
  @IsNumber()
  pageSize: number;
  @IsString()
  name: string;
}
