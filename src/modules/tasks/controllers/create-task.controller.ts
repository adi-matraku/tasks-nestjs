import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';

// import { CreateTaskDto } from '../dtos/createTaskDto';

@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly createTasksService: TasksService) {}

  @Post('')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.createTasksService.createOne(createTaskDto);
  }
}
