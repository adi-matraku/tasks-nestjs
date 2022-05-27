import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly tasksService: TasksService) {}

  //@HttpCode(204)
  //    @Param('pageNumber') pageNumber: number,
  //     @Param('pageSize') pageSize: number,
  //     @Param('statusId') statusId: number,
  //     @Param('name') name: string,
  //     @Param('description') description: string
  @Get('')
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() query: queryDto) {
    console.log(query);
    return this.tasksService.getAll(query);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async createOne(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createOne(createTaskDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async editOne(@Body() editTaskDto: EditTaskDto, @Param('id') id: number) {
    return this.tasksService.editOne(editTaskDto, id);
  }

  @Patch('status/:id')
  @UsePipes(ValidationPipe)
  async editStatus(@Body() editStatusDto: statusDto, @Param('id') id: number) {
    return this.tasksService.editStatus(editStatusDto, id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param('id') id: number) {
    return this.tasksService.deleteOne(id);
  }
}
