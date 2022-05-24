import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';

export class Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatusEntity;
  type: TaskTypeEntity[];
  // createdAt: Date;
  // lastUpdatedAt: Date;
  // lastUpdatedBy: string;
  // isActive: boolean;
}
