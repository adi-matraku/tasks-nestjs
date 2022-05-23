import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly createTasksService: TasksService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.createTasksService.createOne(createTaskDto);
  }
}
