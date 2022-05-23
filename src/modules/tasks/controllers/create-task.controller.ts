import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly tasksService: TasksService) {}

  //get all me filtra dhe paginim
  // get one by id
  // patch
  // soft delete

  //@HttpCode(204)
  //    @Param('pageNumber') pageNumber: number,
  //     @Param('pageSize') pageSize: number,
  //     @Param('statusId') statusId: number,
  //     @Param('name') name: string,
  //     @Param('description') description: string
  @Get('')
  async getAll(@Query() query: { pageNumber: number; pageSize: number }) {
    console.log(query);
    return this.tasksService.getAll(query);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createOne(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createOne(createTaskDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async editOne(@Body() editTaskDto: CreateTaskDto, @Param('id') id: number) {
    return this.tasksService.editOne(editTaskDto, id);
  }

  @Patch('status/:id')
  @UsePipes(ValidationPipe)
  // beje dto
  async editStatus(
    @Body() editStatusDto: { statusId: number },
    @Param('id') id: number
  ) {
    return this.tasksService.editStatus(editStatusDto, id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async deleteOne(@Param('id') id: number) {
    return this.tasksService.deleteOne(id);
  }
}
