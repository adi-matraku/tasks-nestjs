import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class statusDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}
