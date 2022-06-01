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
  @IsOptional()
  fromCreatedAt: Date | string;
  @IsOptional()
  toCreatedAt: Date | string;
  @IsOptional()
  users: string;
  @IsOptional()
  lastUpdatedBy: string;
  @IsOptional()
  statuses: string;
  @IsOptional()
  types: string;
}
