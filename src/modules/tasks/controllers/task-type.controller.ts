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
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../users/utils/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('taskType')
export class TaskTypeController {
  constructor(private readonly tasksTypeService: TasksTypeService) {}

  @Get('')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async getAll() {
    return this.tasksTypeService.getAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksTypeService.getById(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async createTask(@Body() taskType: TaskTypeDto): Promise<TaskType> {
    return this.tasksTypeService.createOne(taskType);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async editOne(@Body() editTypeDto: TaskTypeDto, @Param('id') id: number) {
    return this.tasksTypeService.editOne(editTypeDto, id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async deleteOne(@Param('id') id: number) {
    return this.tasksTypeService.deleteOne(id);
  }
}
