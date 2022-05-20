import { IsNotEmpty } from 'class-validator';

export class TaskStatusDto {
  @IsNotEmpty()
  type: string;
}
