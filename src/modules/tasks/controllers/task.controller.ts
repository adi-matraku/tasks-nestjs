import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { queryDto } from '../dtos/query.dto';
import { statusDto } from '../dtos/status.dto';
import { EditTaskDto } from '../dtos/edit-task.dto';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../users/utils/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/utils/get-user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiTags('tasks')
  async getAll(@Query() query: queryDto) {
    return this.tasksService.getAll(query);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiTags('tasks')
  async createOne(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createOne(createTaskDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiTags('tasks')
  async editOne(
    @Body() editTaskDto: EditTaskDto,
    @Param('id') id: number,
    @GetUser() user: UserEntity
  ) {
    return this.tasksService.editOne(editTaskDto, id, user);
  }

  @Patch('status/:id')
  @UseGuards(RoleGuard)
  @Roles('admin', 'user')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('accessToken')
  @ApiTags('tasks')
  async editStatus(
    @Req() req: Request,
    @Body() editStatusDto: statusDto,
    @Param('id') id: number
  ) {
    return this.tasksService.editStatus(req, editStatusDto, id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiTags('tasks')
  async deleteOne(@Param('id') id: number) {
    return this.tasksService.deleteOne(id);
  }
}
