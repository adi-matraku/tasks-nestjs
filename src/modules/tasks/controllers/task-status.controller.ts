import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksStatusService } from '../services/tasks-status.service';
import { TaskStatusDto } from '../dtos/taskStatus.dto';
import { TaskStatus } from '../models/task-status.model';

@Controller('taskStatus')
export class TaskStatusController {
  constructor(private readonly tasksStatusService: TasksStatusService) {}

  @Get('')
  async getAll() {
    return this.tasksStatusService.getAll();
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskStatus: TaskStatusDto): Promise<TaskStatus> {
    return this.tasksStatusService.createOne(taskStatus);
  }
}
