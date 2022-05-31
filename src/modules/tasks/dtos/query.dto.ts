import { IsOptional, IsString } from 'class-validator';

export class queryDto {
  // @IsNumber()
  @IsOptional()
  pageNumber: number;
  // @IsNumber()
  @IsOptional()
  pageSize: number;
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;
}
