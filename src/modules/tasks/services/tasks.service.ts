import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../models/task.model';
import { NotFoundException } from '../utils/not-found.exception';
import { statusDto } from '../dtos/status.dto';
import { queryDto } from '../dtos/query.dto';
import { EditTaskDto } from '../dtos/edit-task.dto';
import { TaskQuery } from '../models/task-query.model';

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

  async getAll(query: queryDto): Promise<TaskQuery> {
    const startRow = (query.pageNumber - 1) * query.pageSize;
    const where: any = { isActive: true };
    if (query.name) {
      where.name = query.name;
    }
    const [data, total] = await this.taskRepository.findAndCount({
      take: query.pageSize,
      skip: startRow,
      where,
      relations: ['status', 'type'],
    });
    console.log(startRow);
    return {
      data,
      meta: {
        total,
        pageSize: query.pageSize,
        pageNumber: query.pageNumber,
      },
    };
  }

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
      task.createdAt = new Date();

      if (!taskStatus) {
        throw new NotFoundException('Status ID not Found.');
      }

      if (taskType.length === typeIds.length) {
        for (let i = 0; i < typeIds.length; i++) {
          if (!typeIds.includes(taskType[i].id)) {
            throw new NotFoundException();
          }
        }
      } else {
        throw new NotFoundException();
      }

      await this.taskRepository.save(task);
      return task as Task;
    } catch (error) {
      throw error;
    }
  }

  async editOne(editTaskDto: EditTaskDto, id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: id },
        relations: ['status', 'type'],
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      const typeIds = editTaskDto.typeId;

      if (editTaskDto.statusId) {
        const taskStatus = await this.tasksStatusRepository.findOne(
          editTaskDto?.statusId
        );
        task.status = taskStatus;

        if (!taskStatus) {
          throw new NotFoundException('Status ID not Found.');
        }
      }

      if (editTaskDto.typeId) {
        const taskType = await this.tasksTypeRepository.findByIds(
          editTaskDto?.typeId
        );
        task.type = taskType;

        if (taskType?.length === typeIds?.length) {
          for (let i = 0; i < typeIds?.length; i++) {
            if (!typeIds?.includes(taskType[i]?.id)) {
              throw new NotFoundException();
            }
          }
        } else {
          throw new NotFoundException();
        }
      }

      task.name = editTaskDto?.name;
      task.description = editTaskDto?.description;
      task.lastUpdatedAt = new Date();

      await this.taskRepository.save(task);
      return task as Task;
    } catch (error) {
      throw error;
    }
  }

  async editStatus(editStatusDto: statusDto, id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const taskStatus = await this.tasksStatusRepository.findOne(
        editStatusDto.statusId
      );

      if (!taskStatus) {
        throw new NotFoundException('Status ID not Found.');
      }

      task.status = taskStatus;

      await this.taskRepository.save(task);
      return task as Task;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      const task = await this.taskRepository.findOne(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      task.isActive = false;
      await this.taskRepository.save(task);
      return;
    } catch (error) {
      throw error;
    }
  }
}
