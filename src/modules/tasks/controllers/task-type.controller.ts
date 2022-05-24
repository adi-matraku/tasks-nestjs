import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksTypeService } from '../services/tasks-type.service';
import { TaskType } from '../models/task-type.model';
import { TaskTypeDto } from '../dtos/taskType.dto';
import { TaskStatusDto } from '../dtos/taskStatus.dto';

@Controller('taskType')
export class TaskTypeController {
  constructor(private readonly tasksTypeService: TasksTypeService) {}

  @Get('')
  async getAll() {
    return this.tasksTypeService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksTypeService.getById(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskType: TaskTypeDto): Promise<TaskType> {
    return this.tasksTypeService.createOne(taskType);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async editOne(@Body() editTypeDto: TaskTypeDto, @Param('id') id: number) {
    return this.tasksTypeService.editOne(editTypeDto, id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async deleteOne(@Param('id') id: number) {
    return this.tasksTypeService.deleteOne(id);
  }
}
