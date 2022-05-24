import { IsNumber } from 'class-validator';

export class statusDto {
  @IsNumber()
  statusId: number;
}
