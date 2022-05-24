import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksStatusService.getById(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskStatus: TaskStatusDto): Promise<TaskStatus> {
    return this.tasksStatusService.createOne(taskStatus);
  }
}
