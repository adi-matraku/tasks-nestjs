import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { TaskTypeDto } from '../dtos/taskType.dto';
import { TaskType } from '../models/task-type.model';
import { TaskStatus } from '../models/task-status.model';

@Injectable()
export class TasksTypeService {
  constructor(
    @InjectRepository(TaskTypeEntity)
    private readonly taskTypeRepository: Repository<TaskTypeEntity>
  ) {}

  async createOne(taskTypeDto: TaskTypeDto): Promise<TaskType> {
    try {
      const taskType = await this.taskTypeRepository.save(taskTypeDto);
      return taskType as unknown as TaskType;
    } catch (error) {
      throw error;
    }
  }
}
