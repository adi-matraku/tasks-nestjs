import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateTaskDto } from '../dtos/createTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskStatus } from '../models/task-status.model';
import { Task } from '../models/task.model';

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

  async createOne(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const typeIds = createTaskDto.typeId;
      const taskStatus = await this.tasksStatusRepository.findOne(
        createTaskDto.statusId
      );
      const taskType = await this.tasksTypeRepository.findByIds(
        createTaskDto.typeId
      );
      const task = new TaskEntity();
      task.name = createTaskDto.name;
      task.description = createTaskDto.description;
      task.type = taskType;
      task.status = taskStatus;

      if (!taskStatus) {
        throw new HttpException('Status ID not found', HttpStatus.BAD_REQUEST);
      } else if (taskType.length === 0) {
        throw new HttpException(
          'Task Type ID is not found!',
          HttpStatus.BAD_REQUEST
        );
      }

      if (typeIds.length === taskType.length) {
        for (let i = 0; i < typeIds.length; i++) {
          if (!typeIds.includes(taskType[i].id)) {
            throw new HttpException(
              'Task Type ID is not found!',
              HttpStatus.BAD_REQUEST
            );
          }
        }
      } else {
        throw new HttpException(
          'Task Type ID is not found!',
          HttpStatus.BAD_REQUEST
        );
      }

      await this.taskRepository.save(task);
      return task as Task;
    } catch (error) {
      throw error;
    }
  }
}
