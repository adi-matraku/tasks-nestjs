import { Injectable } from '@nestjs/common';
// import { CreateTaskDto } from '../dtos/createTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskStatusEntity)
    private readonly tasksStatusRepository: Repository<TaskStatusEntity>,
    @InjectRepository(TaskTypeEntity)
    private readonly tasksTypeRepository: Repository<TaskTypeEntity>
  ) {}

  async createOne(createTaskDto: CreateTaskDto) {
    try {
      const taskStatus = await this.tasksStatusRepository.findOne(
        createTaskDto.statusId
      );
      console.log(taskStatus);
      const taskType = await this.tasksTypeRepository.findByIds(
        createTaskDto.typeId
      );
      console.log(taskType);
      const task = new TaskEntity();
      task.name = createTaskDto.name;
      task.description = createTaskDto.description;
      task.type = taskType;
      task.status = taskStatus;
      await this.taskRepository.save(task);
      return task as any;
    } catch (error) {
      throw error;
    }
  }
}
