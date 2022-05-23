import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskStatusDto } from '../dtos/taskStatus.dto';
import { TaskStatus } from '../models/task-status.model';

@Injectable()
export class TasksStatusService {
  constructor(
    @InjectRepository(TaskStatusEntity)
    private readonly taskStatusRepository: Repository<TaskStatusEntity>
  ) {}

  async createOne(taskStatusDto: TaskStatusDto): Promise<TaskStatus> {
    try {
      const taskStatus = await this.taskStatusRepository.save(taskStatusDto);
      return taskStatus as unknown as TaskStatus;
    } catch (error) {
      throw error;
    }
  }
}