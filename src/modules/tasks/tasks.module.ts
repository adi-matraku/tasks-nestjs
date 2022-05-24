import { Module } from '@nestjs/common';
import { CreateTaskController } from './controllers/create-task.controller';
import { TasksService } from './services/tasks.service';
import { TasksStatusService } from './services/tasks-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskStatusEntity } from './entities/task-status.entity';
import { TaskStatusController } from './controllers/task-status.controller';
import { TaskTypeEntity } from './entities/task-type.entity';
import { TaskTypeController } from './controllers/task-type.controller';
import { TasksTypeService } from './services/tasks-type.service';

@Module({
  controllers: [CreateTaskController, TaskStatusController, TaskTypeController],
  providers: [TasksService, TasksStatusService, TasksTypeService],
  imports: [
    TypeOrmModule.forFeature([TaskEntity, TaskStatusEntity, TaskTypeEntity]),
  ],
})
export class TasksModule {}
