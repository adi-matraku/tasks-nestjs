import { IsNotEmpty, IsNumber } from 'class-validator';

export class statusDto {
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}
