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
import { TasksStatusService } from '../services/tasks-status.service';
import { TaskStatusDto } from '../dtos/taskStatus.dto';
import { TaskStatus } from '../models/task-status.model';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../users/utils/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('taskStatus')
export class TaskStatusController {
  constructor(private readonly tasksStatusService: TasksStatusService) {}

  @Get('')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async getAll() {
    return this.tasksStatusService.getAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksStatusService.getById(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Body() taskStatus: TaskStatusDto): Promise<TaskStatus> {
    return this.tasksStatusService.createOne(taskStatus);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: number) {
    return this.tasksStatusService.deleteOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async editOne(@Body() editStatusDto: TaskStatusDto, @Param('id') id: number) {
    return this.tasksStatusService.editOne(editStatusDto, id);
  }
}
