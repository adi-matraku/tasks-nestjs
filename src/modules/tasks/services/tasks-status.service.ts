import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskStatusDto } from '../dtos/taskStatus.dto';
import { TaskStatus } from '../models/task-status.model';
import { NotFoundException } from '../utils/not-found.exception';
import { UserEntity } from '../../users/entities/user.entity';
import { ConflictException } from '../../auth/exceptions/Conflict.exception';

@Injectable()
export class TasksStatusService {
  constructor(
    @InjectRepository(TaskStatusEntity)
    private readonly taskStatusRepository: Repository<TaskStatusEntity>
  ) {}

  async getAll(): Promise<TaskStatus[]> {
    try {
      return this.taskStatusRepository.find({ where: { isActive: true } });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: number): Promise<TaskStatus> {
    try {
      const status = await this.taskStatusRepository.findOne({
        where: { id: id, isActive: true },
      });
      if (!status) {
        throw new NotFoundException('Status not Found.');
      }
      return status as TaskStatus;
    } catch (err) {
      throw err;
    }
  }

  async createOne(taskStatusDto: TaskStatusDto): Promise<TaskStatus> {
    try {
      const taskStatusUsed = await this.taskStatusRepository.findOne({
        where: { type: taskStatusDto.type, isActive: true },
      });
      console.log(taskStatusUsed);
      if (taskStatusUsed) {
        console.log('Task status used');
        throw new ConflictException('Task Status already exists');
      }
      console.log('NOT USED');
      const taskStatus = await this.taskStatusRepository.save(taskStatusDto);
      return taskStatus as unknown as TaskStatus;
    } catch (error) {
      throw error;
    }
  }

  async editOne(
    editStatusDto: TaskStatusDto,
    id: number,
    user: UserEntity
  ): Promise<TaskStatus> {
    try {
      const status = await this.taskStatusRepository.findOne({
        where: { id: id, isActive: true },
      });
      const taskStatusUsed = await this.taskStatusRepository.findOne({
        where: { type: editStatusDto.type, isActive: true },
      });
      if (!status) {
        throw new NotFoundException('Status not Found');
      }
      if (taskStatusUsed) {
        throw new ConflictException('Task Status already exists');
      }

      // status.lastUpdatedBy = user;
      status.type = editStatusDto.type;

      await this.taskStatusRepository.save(status);
      return status as TaskStatus;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      const status = await this.taskStatusRepository.findOne({
        where: { id: id, isActive: true },
      });
      if (!status) {
        throw new NotFoundException('Status not Found');
      }
      status.isActive = false;
      await this.taskStatusRepository.save(status);
      return;
    } catch (error) {
      throw error;
    }
  }
}
