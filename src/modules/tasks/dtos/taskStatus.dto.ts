import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  type: string;
}
