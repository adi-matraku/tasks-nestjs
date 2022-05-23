import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksTypeService } from '../services/tasks-type.service';
import { TaskType } from '../models/task-type.model';
import { TaskTypeDto } from '../dtos/taskType.dto';

@Controller('taskType')
export class TaskTypeController {
  constructor(private readonly tasksTypeService: TasksTypeService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskType: TaskTypeDto): Promise<TaskType> {
    return this.tasksTypeService.createOne(taskType);
  }
}
