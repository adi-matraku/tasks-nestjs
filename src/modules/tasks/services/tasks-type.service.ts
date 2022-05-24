import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { TaskTypeDto } from '../dtos/taskType.dto';
import { TaskType } from '../models/task-type.model';
import { TaskStatus } from '../models/task-status.model';
import { NotFoundException } from '../utils/not-found.exception';
import { TaskStatusDto } from '../dtos/taskStatus.dto';

@Injectable()
export class TasksTypeService {
  constructor(
    @InjectRepository(TaskTypeEntity)
    private readonly taskTypeRepository: Repository<TaskTypeEntity>
  ) {}

  async getAll(): Promise<TaskType[]> {
    try {
      return this.taskTypeRepository.find({ where: { isActive: true } });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<TaskType> {
    try {
      const type = await this.taskTypeRepository.findOne(id);
      if (!type) {
        throw new NotFoundException('Type not Found.');
      }
      return type as TaskType;
    } catch (err) {
      throw err;
    }
  }

  async createOne(taskTypeDto: TaskTypeDto): Promise<TaskType> {
    try {
      const taskType = await this.taskTypeRepository.save(taskTypeDto);
      return taskType as unknown as TaskType;
    } catch (error) {
      throw error;
    }
  }

  async editOne(editStatusDto: TaskTypeDto, id: number): Promise<TaskType> {
    try {
      const type = await this.taskTypeRepository.findOne({
        where: { id: id, isActive: true },
      });
      if (!type) {
        throw new NotFoundException('Type not found');
      }

      type.name = editStatusDto.name;

      await this.taskTypeRepository.save(type);
      return type as TaskType;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      const type = await this.taskTypeRepository.findOne(id);
      if (!type) {
        throw new NotFoundException('Task not found');
      }
      type.isActive = false;
      await this.taskTypeRepository.save(type);
      return;
    } catch (error) {
      throw error;
    }
  }
}
