import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async deleteOne(@Param('id') id: number) {
    return this.tasksStatusService.deleteOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async editOne(@Body() editStatusDto: TaskStatusDto, @Param('id') id: number) {
    return this.tasksStatusService.editOne(editStatusDto, id);
  }
}
