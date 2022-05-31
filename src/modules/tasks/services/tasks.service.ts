import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Like, Repository } from 'typeorm';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../models/task.model';
import { NotFoundException } from '../utils/not-found.exception';
import { statusDto } from '../dtos/status.dto';
import { queryDto } from '../dtos/query.dto';
import { EditTaskDto } from '../dtos/edit-task.dto';
import { TaskQuery } from '../models/task-query.model';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskStatusEntity)
    private readonly tasksStatusRepository: Repository<TaskStatusEntity>,
    @InjectRepository(TaskTypeEntity)
    private readonly tasksTypeRepository: Repository<TaskTypeEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async getAll(query: queryDto): Promise<any> {
    const startRow = (query.pageNumber - 1) * query.pageSize;

    // let where: any = {};
    // if (query.name) {
    //   where = {
    //     isActive: true,
    //     name: query.name ? Like('' + query.name + ' #%') : undefined,
    //   };
    // }

    let where = [];

    if (query.name && query.description) {
      console.log('both');
      where = [
        {
          name: Like('%' + query.name + '%'),
          description: Like('%' + query.description + '%'),
        },
      ];
    }

    if (
      (query.name && !query.description) ||
      (!query.name && query.description)
    ) {
      console.log('one');
      where = [
        {
          name: Like('%' + query.name + '%'),
        },
        {
          description: Like('%' + query.description + '%'),
        },
      ];
    }
    //
    // Object.keys(where).forEach(key =>
    //   where[key] === undefined ? delete where[key] : {}
    // );

    // console.log(where.name);

    const [data, total] = await this.taskRepository.findAndCount({
      take: query.pageSize,
      skip: startRow,
      where: where,
      relations: ['status', 'type', 'lastUpdatedBy'],
    });

    return {
      data,
      meta: {
        total,
        pageSize: query.pageSize || 10,
        pageNumber: query.pageNumber || 1,
      },
    };
    // const where: any = { isActive: true };
    // if (query.name) {
    //   where.name = query.name;
    // }
    // const where = `(tasks.name like '%${query.name}%')`;
    // const where = `("tasks.name like :name", { name:'%${query.name}%' })`;

    // console.log('where', where);
  }

  // async getFiltered(query: queryDto): Promise<any> {
  //   const startRow = (query.pageNumber - 1) * query.pageSize;
  //   const data = await this.taskRepository
  //     .createQueryBuilder('tasks')
  //     .select('tasks')
  //     .leftJoinAndSelect('tasks.status', 'status')
  //     .leftJoinAndSelect('tasks.type', 'type')
  //     .leftJoinAndSelect('tasks.lastUpdatedBy', 'lastUpdatedBy')
  //     .where('tasks.name like :name', { name: `%${query.name}%` })
  //     .andWhere('tasks.description like :description', {
  //       description: `%${query.description}%`,
  //     })
  //     .take(query.pageSize || 10)
  //     .skip(startRow || 0)
  //     .getMany();
  //
  //   return {
  //     data,
  //     meta: {
  //       pageSize: query.pageSize,
  //       pageNumber: query.pageNumber,
  //     },
  //   };
  // }

  // async getFiltered(query: queryDto): Promise<any> {
  //   const take = query.pageSize || 10;
  //   const skip = (query.pageNumber - 1) * query.pageSize || 0;
  //   const name = query.name || '';
  //
  //   if (query.name && query.description) {
  //     const queryBuilder = await this.taskRepository.createQueryBuilder(
  //       'tasks'
  //     );
  //
  //     const data = await queryBuilder
  //       .select('tasks')
  //       .leftJoinAndSelect('tasks.status', 'status')
  //       .leftJoinAndSelect('tasks.type', 'type')
  //       .leftJoinAndSelect('tasks.lastUpdatedBy', 'lastUpdatedBy')
  //       .where('tasks.name like :name', { name: `%${query.name}%` })
  //       .andWhere('tasks.description like :description', {
  //         description: `%${query.description}%`,
  //       })
  //       .skip(skip)
  //       .take(take)
  //       .getMany();
  //
  //     const itemCount = await queryBuilder.getCount();
  //
  //     return {
  //       data,
  //       itemCount,
  //     };
  //   }
  //
  //   if (query.name) {
  //     return await this.queryData(query, query.name);
  //   }
  // }
  //
  // async queryData(query: queryDto, property: string) {
  //   const take = query.pageSize || 10;
  //   const skip = (query.pageNumber - 1) * query.pageSize || 0;
  //
  //   const [data] = await this.taskRepository.findAndCount({
  //     where: { name: Like('%' + property + '%') },
  //     relations: ['status', 'type', 'lastUpdatedBy'],
  //     take: take,
  //     skip: skip,
  //   });
  //
  //   return {
  //     data,
  //     meta: {
  //       pageSize: query.pageSize,
  //       pageNumber: query.pageNumber,
  //     },
  //   };
  // }

  async createOne(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const typeIds = createTaskDto.typeId;
      const taskStatus = await this.tasksStatusRepository.findOne({
        where: { id: createTaskDto.statusId, isActive: true },
      });
      const taskType = await this.tasksTypeRepository.findByIds(
        createTaskDto.typeId,
        {
          where: { isActive: true },
        }
      );
      const user = await this.usersRepository.findOne({
        where: { id: createTaskDto.userId, isActive: true },
      });
      const task = new TaskEntity();
      task.name = createTaskDto.name;
      task.description = createTaskDto.description;
      task.type = taskType;
      task.status = taskStatus;
      task.user = user;
      task.lastUpdatedAt = task.createdAt = new Date();

      if (!taskStatus) {
        throw new NotFoundException('Status ID not Found.');
      }
      if (!user) {
        throw new NotFoundException('User ID not Found.');
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

  async editOne(
    editTaskDto: EditTaskDto,
    id: number,
    user: UserEntity
  ): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: id, isActive: true },
        relations: ['status', 'type'],
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }
      const typeIds = editTaskDto.typeId;

      if (editTaskDto.statusId) {
        const taskStatus = await this.tasksStatusRepository.findOne({
          where: { id: editTaskDto?.statusId, isActive: true },
        });
        task.status = taskStatus;

        if (!taskStatus) {
          throw new NotFoundException('Status ID not Found.');
        }
      }

      if (editTaskDto.typeId) {
        const taskType = await this.tasksTypeRepository.findByIds(
          editTaskDto?.typeId,
          {
            where: { isActive: true },
          }
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
      task.lastUpdatedBy = user;

      await this.taskRepository.save(task);
      return task as Task;
    } catch (error) {
      throw error;
    }
  }

  async editStatus(editStatusDto: statusDto, id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: id, isActive: true },
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const taskStatus = await this.tasksStatusRepository.findOne({
        where: { id: editStatusDto.statusId, isActive: true },
      });

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
      const task = await this.taskRepository.findOne({
        where: { id: id, isActive: true },
      });
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
